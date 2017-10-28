# express-public-ip [![Build Status](https://travis-ci.org/floatdrop/express-public-ip.svg?branch=master)](https://travis-ci.org/floatdrop/express-public-ip)

> Filter private addresses from req.ips


## Install

```
$ npm install --save express express-public-ip
```


## Usage

```js
var app = require('express')();
var expressPublicIp = require('express-public-ip');

app.enable('trust proxy');

app.use(expressPublicIp());

app.get('/', function (req, res) {
	res.send(req.ip);
});
```


## API

### expressPublicIp()

Returns `express-public-ip` middleware function.

## License

MIT © [Vsevolod Strukchinsky](http://github.com/floatdrop)
