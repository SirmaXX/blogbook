var isObject = require('lodash.isObject')
var isString = require('lodash.isstring')
var extend = require('xtend');

module.exports = Object

function Object(src, defaults) {
  if (!isObject(src))
    throw new Error('TypeError: expected object definition. ' + src)

  if (!isString(src.id) || !(src.id.length > 0))
    throw new Error('id must be a nonempty string. Got '+ src.id);

  // copy for modification
  src = extend(Object.defaults, defaults, src)

  return src
}

Object.contextUrl = 'http://transformer.io/context/transformer.jsonld'

Object.defaults = {
  '@context': Object.contextUrl,
}
