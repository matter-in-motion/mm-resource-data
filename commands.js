'use strict';

module.exports = {
  __extend: true,
  loadData: {
    description: '[file]. Load resource data from file',
    call: function(name) {
      return require('./load')(this.units, name);
    }
  }
}
