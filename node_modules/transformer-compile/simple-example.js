var compile = require('./')
var unix2js = require('transformer.unix-time-to-js-date')
var js2iso = require('transformer.js-date-to-iso-date')
console.log(compile([unix2js, js2iso]))
