module.exports = compose

function compose() {
  compose.sync.apply(this, arguments)
}

compose.sync = require('./sync')
compose.async = require('./async')
