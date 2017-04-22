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
        let e = jm.err('SUCCESS');
        expect(e.name).to.be.equal('SUCCESS');
        console.log(e);
    });
});
