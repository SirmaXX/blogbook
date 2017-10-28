var defer = require('./defer');
var map = require('lodash.map');

// composition of sync functions.
module.exports = function transformerAsyncCompose(conversions) {
  conversions = map(conversions, forceAsyncConversion);
  return composeConversions(conversions);
}

function forceAsyncConversion(conversion) {
  // todo fix this
  // if (!(conversion instanceof Conversion))
  //   throw new Error('conversion must be instance of Conversion');

  // already async?
  if (conversion.async)
    return conversion;

  return function(input, callback) {
    // catch thrown errors and pass them to the callback.
    try {
      callback(null, conversion(input));
    } catch (e) {
      callback(e);
    }
  }
}

function composeConversions(conversions) {
  // conversion composition is tricky, because we have to handle errors
  // and call the conversions in order, with a callback chain.
  var funcs = conversions.slice(0);
  var callback = undefined;

  function composed(input) {
    // take the next conversion to apply.
    var func = funcs.shift();

    if (!func) { // no more? we've reached the end.
      callback(null, input);
      return;
    }

    func(input, function(err, output) {
      if (err) { // shortcircuit
        defer(callback, err);
      } else {
        defer(composed, output);
      }
    });
  };

  return function(input, cb) {
    callback = cb; // store callback;
    composed(input);
  };
}
