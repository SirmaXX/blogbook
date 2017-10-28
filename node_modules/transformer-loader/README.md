# transformer-loader

Module loader for [transformer](http://github.com/jbenet/transformer). This module loads the right module for a given transformer type or conversion name. For example `loader('a')` will `require('transformer.a')`

Warning: require magic.
Warning2: this module is small and gross. it will do more later.

## Example

```js
var loader = require('transformer-loader')
var a = loader('a')
var a = loader('b')
var a2b = loader('a-to-b')
```
