# Matter In Motion. CLI extension for loading resource initial data.

[![NPM Version](https://img.shields.io/npm/v/mm-resource-data.svg?style=flat-square)](https://www.npmjs.com/package/mm-resource-data)
[![NPM Downloads](https://img.shields.io/npm/dt/mm-resource-data.svg?style=flat-square)](https://www.npmjs.com/package/mm-resource-data)

## Usage

[Extensions installation instructions](https://github.com/matter-in-motion/mm/blob/master/docs/extensions.md)

## Cli

* resource
  - load — [file or directory]. Load resource data from the JSON file or all JSON files in the directory. The default is `data` directory. All files that start with `_` are skipped. __This extension uses a `resource.controller` create method to import data.__

## Data JSON format

```
{
  "resource": [
    { ... },
    { ... }
  ]
}
```


License: MIT.
