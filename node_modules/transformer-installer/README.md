# transformer-installer

Install [transformer](http://github.com/jbenet/transformer) modules.

## Example

```js
var install = require('transformer-installer')

// local
install('unix-time')

// global
install('unix-time', true)

// many
install(['unix-time', 'js-date', 'iso-date'])
```
