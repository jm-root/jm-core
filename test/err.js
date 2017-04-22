import chai from 'chai';
let expect = chai.expect;
import $ from '../src';
import enableErr from '../src/err';

let jm = new $();
describe('err', function () {
    it('jm.ERR', function () {
        expect(enableErr).to.be.a('function');
        expect(jm.ERR).to.be.an('object');
    });
    it('jm.err', function () {
        expect(jm.err).to.be.a('function');
        let E = jm.ERR['SUCCESS'];
        let e = jm.err(E);
        expect(e.message).to.be.equal(E.msg);
        jm.logger.info(e.stack);

        e = jm.err('err param: ${param} paramNum: ${num}', {
            param: 'abc',
            num: 123,
        });
        expect(e.message).to.be.equal('err param: abc paramNum: 123');
    });
});
