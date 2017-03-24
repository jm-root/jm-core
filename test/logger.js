import chai from 'chai';
let expect = chai.expect;
import JM from '../src';
import Logger from '../src/logger';

jm = JM();

var log = function (logger) {
    ['debug','info','warn','error','fatal'].forEach(function(level) {
        logger[level] && (logger[level]('logger test: %s %s', level, Date.now()));
    });
};

describe('logger', function() {
    it('jm.logger', function() {
        expect(jm.logger).to.be.an('object');
        expect(Logger).to.be.an('function');
        log(jm.logger);
    });

    it('jm.getLogger', function() {
        expect(jm.getLogger).to.be.a('function');
        var logger = jm.getLogger('main');
        expect(logger).to.be.an('object');
        log(logger);
    });

});
