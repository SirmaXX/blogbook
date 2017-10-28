# npm-dir [![NPM version](https://badge.fury.io/js/npm-dir.png)](http://badge.fury.io/js/npm-dir) [![Build Status](https://travis-ci.org/kaelzhang/node-npm-dir.png?branch=master)](https://travis-ci.org/kaelzhang/node-npm-dir) [![Dependency Status](https://gemnasium.com/kaelzhang/node-npm-dir.png)](https://gemnasium.com/kaelzhang/node-npm-dir)

Utility method to get global `npm.dir`.

## Usage

```
var npm = require('npm-dir');

console.log(npm.dir);       // '/usr/local/lib/node_modules' if on mac
console.log(npm.prefix);    // '/usr/local/' if on mac by default
```