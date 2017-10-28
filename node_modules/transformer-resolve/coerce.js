var isString = require('lodash.isstring')
var isObject = require('lodash.isObject')
var Type = require('transformer-type');
var Conversion = require('transformer-conversion');
var Loader = require('transformer-loader')
var Object = Type.Object;
var Value = Conversion.Value;


module.exports = function coerce(obj, useGlobal) {

  // string? load module.
  if (isString(obj))
    return Loader(obj, useGlobal)

  // transformer object? all good.
  if (obj instanceof Value ||
      obj instanceof Type ||
      obj instanceof Conversion ||
      obj === Type ||
      obj === Conversion ||
      (obj.src && obj.src["@context"] == Object.contextUrl)) {
    return obj;
  }

  // raw object with type? construct.
  if (isObject(obj) && obj['type']) {
    switch (obj['type']) {
    case 'type': return Type(obj);
    case 'conversion': return Conversion(obj);
    }
  }

  // wat?
  console.log(obj);
  throw new Error('transformer: unknown input object: ' + obj);
};
