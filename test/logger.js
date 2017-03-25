import chai from 'chai';
let expect = chai.expect;
import $ from '../src';
import {logger as Logger} from '../src';

jm = $();

let log = function (logger) {
    ['debug', 'info', 'warn', 'error', 'fatal'].forEach(function (level) {
        logger[level] && (logger[level](`${level}`));
    });
};

describe('logger', function () {
    it('jm.logger', function () {
        expect(jm.logger).to.be.an('object');
        expect(Logger).to.be.an('function');
        log(jm.logger);
    });

    it('jm.getLogger', function () {
        expect(jm.getLogger).to.be.a('function');
        let logger = jm.getLogger('main');
        expect(logger).to.be.an('object');
        log(logger);
    });
});
