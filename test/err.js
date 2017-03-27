import chai from 'chai';
let expect = chai.expect;
import $ from '../src';
import err from '../src/err';

let jm = new $();
describe('err', function () {
    it('jm.ERR', function () {
        expect(err).to.be.a('function');
        expect(jm.ERR).to.be.an('object');
    });
});
