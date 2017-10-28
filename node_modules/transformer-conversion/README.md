# transformer-conversion

Conversions in [transformer](http://github.com/jbenet/transformer).

## Example

See: [transformer.js-date-to-unix-time](https://github.com/jbenet/transformer.js-date-to-unix-time)


```js
var Conversion = require('transformer-conversion')
var tJsDate = require('transformer.js-date')
var tUnixTime = require('transformer.unix-time')
// require any other modules you may need here.

module.exports = Conversion(tJsDate, tUnixTime, convert)

function convert(jsDate) {
  return jsDate.getTime() / 1000.0; // Date uses ms, not s.
}
```

See also: https://github.com/jbenet/transformer-pkg#transformer-pkg-init-conversion
