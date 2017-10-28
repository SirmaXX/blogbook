'use strict';

var node_path = require('path');
var prefix;

Object.defineProperties(exports, {
    dir: {
        get: function () {
            return process.platform === 'win32' ?
                node_path.resolve(exports.prefix, 'node_modules') :
                node_path.resolve(exports.prefix, 'lib', 'node_modules');
        }
    },

    prefix: {
        get: function () {
            if ( !prefix ){
                if (process.env.PREFIX) {
                    prefix = process.env.PREFIX;

                } else if (process.platform === 'win32') {
                    // c:\node\node.exe --> prefix=c:\node\
                    prefix = node_path.dirname(process.execPath);

                } else {
                    // /usr/local/bin/node --> prefix=/usr/local
                    prefix = node_path.dirname(node_path.dirname(process.execPath));

                    // destdir only is respected on Unix
                    if (process.env.DESTDIR) {
                        prefix = node_path.join(process.env.DESTDIR, prefix);
                    }
                }
            }

            return prefix;
        }
    }
});