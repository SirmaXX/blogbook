'use strict';

var net = require('net');
var ip = require('ip');

function validIp(ipAddr) {
	return net.isIP(ipAddr) && ip.isPublic(ipAddr);
}

module.exports = function () {
	return function expressPublicIp(req, res, next) {
		req.headers['x-forwarded-for'] = (req.headers['x-forwarded-for'] || '')
			.split(/ *, */)
			.filter(validIp)
			.join(', ');

		next();
	};
};
