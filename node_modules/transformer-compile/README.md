# transformer-compile

Compile [transformer](https://github.com/jbenet/transformer) conversion pipelines into a standalone module.

## Examples

Simple example:

```
> cat simple-example.js
```
```js
var compile = require('transformer-compile')
var unix2js = require('transformer.unix-time-to-js-date')
var js2iso = require('transformer.js-date-to-iso-date')
var code = compile([unix2js, js2iso])
console.log(code)
```

```
> node simple-example.js
```
```js
var compose = require('transformer-compose')
var conversions = [
  require('transformer.unix-time-to-js-date'),
  require('transformer.js-date-to-iso-date'),
]

module.exports = compose.sync(conversions)
```

Resolve conversions from types example:

```
> cat resolve-example.js
```
```js
var compile = require('transformer-compile')
var resolve = require('transformer-resolve')

var types = ['unix-time', 'iso-date']
var convs = resolve(types)
var code = compile(convs)
console.log(code)
```
```
> node resolve-example.js
```
```js
var compose = require('transformer-compose')
var conversions = [
  require('transformer.unix-time-to-js-date'),
  require('transformer.js-date-to-iso-date'),
]

module.exports = compose.sync(conversions)
```

Note: you will need to install these modules to run these examples:

```
> npm install -g transformer-resolve transformer-compose transformer.unix-time transformer.js-date transformer.iso-date transformer.unix-time-to-js-date transformer.js-date-to-iso-date
```
