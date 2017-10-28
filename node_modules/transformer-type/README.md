# transformer-type

Types in [transformer](http://github.com/jbenet/transformer).

## Example

See: [transformer.unix-time](https://github.com/jbenet/transformer.unix-time)


```js
var Type = require('transformer-type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'unix-time',
  'description': 'UNIX DateTime.',
  'schema': "integer"
});
```
