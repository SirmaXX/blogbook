# transformer-resolve

Conversion resolution for [transformer](http://github.com/jbenet/transformer)

WARNING: require magic.

## Example

```js
var resolve = require('transformer-resolve')
var a2c = resolve('a', 'b', 'c') // requires modules

var dataA = ...
var dataC = a2c(dataA) // a -> a2b -> a2c -> c
```
