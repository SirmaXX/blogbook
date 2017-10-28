var _ = {}
_.map = require('lodash.map')
_.last = require('lodash.last')
_.uniq = require('lodash.uniq')
_.template = require('lodash.template')
_.contains = require('lodash.contains')

var search = require('./search');
var Conversion = require('transformer-conversion')
var Loader = require('transformer-loader')
var exec = require('child_process').exec;
var log = console.log

module.exports = install

function install(ids, global) {
  var install = [];
  var modules = modulesToInstall(ids);

  search(null, function(err, allModules) {
    if (err) throw err;

    _.map(modules, function(m) {
      if (_.contains(allModules, m))
        install.push(m);
      else
        log('No npm package for: '+m);
    });

    installModules(install, global);
  });
}

install.explanation = function(ids) {
    var tmpl = _.template("transformer needs the following npm modules to perform this conversion:\n\
<% _.map(ids, function(m) { %>\n\
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

  var modules = _.map(ids, Loader.npmName)
  return tmpl({ _:_, ids: ids, modules: modules })
}

function modulesToInstall(ids) {
  if (!Array.isArray(ids))
    ids = [ids]

  var install = []
  _.map(ids, function(m) {
    // if last is not conversion, add conversion in between
    var last = _.last(install);
    if (last && !last.match(/-to-/)) {
      install.push(Conversion.idWithTypes(last, m));
    }

    install.push(m);
  });

  // make npm names
  install = _.map(install, Loader.npmName);

  install = _.uniq(install);
  return install;
}

function installModules(modules, global) {
  if (!modules || modules.length < 1)
    throw new Error('attempting to install no modules')

  // install them.
  var g = !!global ? '-g ' : ''
  var cmd = 'npm install ' + g + modules.join(' ');
  log(cmd);
  exec(cmd, function(err, stdout, stderr) {
    if (err) log('install error: ' + err);

    log('');
    log('Installed:');
    _.map(modules, function(m) {
      log('- ' + m);
    })
  });
}
