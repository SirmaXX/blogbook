var unique = require('lodash.uniq')
var filter = require('lodash.filter')
var isString = require('lodash.isstring')
var npmDir = require('npm-dir')
var npmResolve = require('resolve')

module.exports = Loader;

function Loader(id, useGlobal) {
  if (!isString(id) || !(id.length > 0))
    throw new Error('id must be a nonempty string. Got '+id);

  if (!Loader.cache[id]) {
    var name = Loader.npmName(id)
    Loader.cache[id] = Loader.loadModule(name, useGlobal)
  }
  return Loader.cache[id]
}

// local cache of loaded modules (based on id).
// Note: this may not be needed -- require has its own...
Loader.cache = {}

// transformer id to npm module name
Loader.npmName = function(id) {
  return 'transformer.' + id;
}


Loader.errIsModuleNotFound = function(err) {
  return err.code == 'MODULE_NOT_FOUND' // node
    || err.toString().match(/Cannot find module/); //browserify
}

Loader.missingModules = function(ids, global) {
  return unique(filter(ids, function(id) {
    try {
      // load. if no exception, it succeeded.
      Loader(id, global);
      return false;
    } catch (e) {
      if (Loader.errIsModuleNotFound(e))
        return true;
      throw e;
    }
  }));
}

Loader.loadModule = function(name, useGlobal) {
  if (!useGlobal)
    return require(name)

  return Loader.globalLoadModule(name)
}

// special global loading, uses npm modules to resolve.
// See https://github.com/jbenet/transformer/issues/15
Loader.globalLoadModule = function(name) {
  try {
    // try simple require first
    return require(name)

  } catch (e) {

    // if error is NOT about module not found, re-throw it.
    if (!Loader.errIsModuleNotFound(e))
      throw e

    // if it is, try global installation
    var res = npmResolve.sync(name, { basedir: npmDir.dir })
    if (res) {
      return require(res);
    }
  }
}
