'use strict';
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const Q = require('queueue');

const logGroup = (cli, group, cb) => {
  cli.group(group);
  cb();
};

const insertData = (ctrl, data) => ctrl.create(data).then(res => res.id || res);

const parseJson = function(q, units, filename, cb) {
  const cli = units.require('core.cli');
  fs.readFile(filename, (err, fileContent) => {
    if (err) {
      return cb(err);
    }

    try {
      const json = JSON.parse(fileContent);

      for (let resource in json) {
        const ctrl = units.get('resources.' + resource + '.controller');

        if (!ctrl) {
          throw new Error(`Error parsing file ${filename}: tno resource ${resource} found`);
        }

        const content = json[resource];
        q.push({
          method: logGroup,
          args: [ cli, `${resource} << ${content.length} documents from ${filename}` ]
        });

        content.forEach(data => q.push({
          method: insertData,
          args: [ ctrl, data ]
        }));
      }
      cb();
    } catch (e) {
      cb(e);
    }
  });
};

const getFiles = function(dataPath = 'data') {
  const root = process.cwd();
  const absolutePath = path.resolve(root, dataPath);

  return new Promise((resolve, reject) => fs.lstat(absolutePath, (err, stats) => {
    if (err) {
      return reject(err);
    }

    if (stats.isFile()) {
      return resolve([ absolutePath ]);
    }

    if (stats.isDirectory()) {
      fs.readdir(absolutePath, (err, files) => {
        if (err) {
          if (err.code === 'ENOENT') {
            return reject(new Error(`No ${dataPath} directory found`))
          }
          return reject(err);
        }

        const rxJson = /^[^_].*\.json$/;
        resolve(files
          .filter(name => rxJson.test(name))
          .map(name => path.join(absolutePath, name))
        );
      });

      return;
    }

    reject(new Error(`No ${absolutePath} file or directory found`));
  }));
}

module.exports = function(units, dataPath) {
  const cli = units.require('core.cli');

  return getFiles(dataPath)
    .then(files => new Promise(resolve => {
      const q = new Q(1)
        .on('done', cli.message)
        .on('error', cli.error)
        .on('drain', resolve);

      files.forEach(file => q.push({
        method: parseJson,
        args: [ q, units, file ]
      }));

      if (!q.length()) {
        resolve('No data files');
      }
    }));
};

