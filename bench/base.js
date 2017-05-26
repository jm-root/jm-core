'use strict';

const benchmark = require('benchmark');
const crypto = require('crypto');

var o = {};
var a = [];

const suite = new benchmark.Suite();

suite
    .add('typeof object', () => {
        typeof o === 'object';
    })
    .add('Array.isArray', () => {
        Array.isArray(a);
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
;

if (require.main === module) {
    suite.run({async: true});
} else {
    module.exports = suite;
}
