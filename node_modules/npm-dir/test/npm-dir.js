'use strict';

var expect = require('chai').expect;
var main = require('../');
var npm = require('npm');

describe("npm-dir", function(){
    it(".dir", function(done){
        npm.load({
            global: true

        }, function () {
            expect(main.dir).to.equal(npm.dir);
            done();
        });
        
    });

    it(".prefix", function(done){
        npm.load({
            global: true

        }, function () {
            expect(main.prefix).to.equal(npm.globalPrefix);
            done();
        });
    });
});