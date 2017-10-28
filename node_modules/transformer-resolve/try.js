var args = ['unix-time', 'js-date']
if (process.argv.length >= 4)
  args = process.argv.slice(2)
console.log('resolving: ' + args)

var resolve = require('./')
console.log(resolve(args, true))
