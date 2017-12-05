# Matter In Motion. Cli extension for easy loading resource initial data.

[![NPM Version](https://img.shields.io/npm/v/mm-resource-data.svg?style=flat-square)](https://www.npmjs.com/package/mm-resource-data)
[![NPM Downloads](https://img.shields.io/npm/dt/mm-resource-data.svg?style=flat-square)](https://www.npmjs.com/package/mm-resource-data)

## Usage

[Extensions installation instructions](https://github.com/matter-in-motion/mm/blob/master/docs/extensions.md)

## Cli

* resource
  - load — [file or directory]. Load resource data from the file or from all JSON files in the directory. The default is `data` directory. All files that start with `_` will be skipped. All data will be created using `resource.controller` create method.

## Data JSON format

```json
{
  "resource": [
    { ... },
    { ... }
  ]
}
```


License: MIT.
