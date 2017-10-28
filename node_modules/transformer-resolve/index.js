var map = require('lodash.map')
var zip = require('lodash.zip')
var template = require('lodash.template')
var coerce = require('./coerce')
var Loader = require('transformer-loader')
var Conversion = require('transformer-conversion')

module.exports = resolve

function resolve(types, useGlobal) {
  if (types.length < 2)
    throw new Error('Must enter more than one type.')

  types = map(types, function(t) {
    return coerce(t, useGlobal)
  })

  return conversionPath(types, useGlobal)
}

function conversionPath(types, useGlobal) {
  var pairs = zip(types.slice(0, types.length - 1), types.slice(1))
  return map(pairs, function(pair) {
    return withTypes(pair[0], pair[1], useGlobal)
  })
}

function withTypes(t1, t2, useGlobal) {
  function loadConversion(t1, t2) {
    return coerce(t1.src.id + '-to-'+ t2.src.id, useGlobal)
  }

  try {
    return loadConversion(t1, t2)
  } catch (e1) {

    // if no conversion exists, try to figure it out.
    if (Loader.errIsModuleNotFound(e1)) {
      // console.log('using identity for ' + t1.src.id + ' and ' +t2.src.id)
      if (t1.src.schema == t2.src.id ||
          t2.src.schema == t1.src.id ||
          t1.src.schema == t2.src.schema ||
          t1.src.id == t2.src.id) {
        return Conversion.Identity(t1, t2)
      }
    }
    throw e1
  }
}

resolve.installMessage = function(ids) {
    var tmpl = template("transformer needs the following npm modules to perform this conversion:\n\
<% _.each(ids, function(m) { %>\n\
  - <%= m %>\
<% }) %>\n\
\n\
To install them, run:\n\
\n\
  # locally, to be used within this directory\n\
  transformer install <%= ids.join(' ') %>\n\
\n\
  # globally, to be used everywhere in your system (you may need to sudo)\n\
  transformer install -g <%= ids.join(' ') %>\n\
\n\
")

  var modules = map(ids, Loader.npmName)
  return tmpl({ ids: ids, modules: modules })
}
