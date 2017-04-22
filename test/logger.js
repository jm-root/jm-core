import chai from 'chai';
let expect = chai.expect;
import $ from '../src';

jm = new $();

describe('logger', function () {
    it('jm.logger', function () {
        let logger = jm.logger;
        expect(logger).to.be.an('object');
        for(let level of ['debug', 'info', 'warn', 'error']) {
            expect(logger[level]).to.be.an('function');
        };
    });

    it('jm.getLogger', function () {
        expect(jm.getLogger).to.be.a('function');
        let logger = jm.getLogger('main');
        expect(logger).to.be.an('object');
        for(let level of ['debug', 'info', 'warn', 'error']) {
            expect(logger[level]).to.be.an('function');
        };
    });
});
