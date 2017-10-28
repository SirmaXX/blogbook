# transformer-compose

Compose [transformer](http://github.com/jbenet/transformer) Conversions.

## Example

```js
var compose = require('transformer-compose').sync

var a2b, b2c, c2d, d2e, e2f = ...
a2f = compose.sync([a2b, b2c, c2d, d2e, e2f])

var dataA = ...
var dataF = a2f(aData)
```
