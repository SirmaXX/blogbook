var compile = require('./')
var resolve = require('transformer-resolve')

var types = ['unix-time', 'js-date', 'iso-date']
var convs = resolve(types)
var code = compile(convs)
console.log(code)
