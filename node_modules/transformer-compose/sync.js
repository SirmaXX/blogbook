var map = require('lodash.map');
var compose = require('lodash.compose');

// composition of sync functions.
module.exports = function transformerSyncCompose(conversions) {
  map(conversions, function(c) {
    if (c.async) {
      throw new Error("Cannot use Async conversion in Sync context. " +
        " use transformer.async");
    }
  })

  return compose.apply(this, conversions.reverse());
}
