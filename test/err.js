import chai from 'chai';
let expect = chai.expect;
import _ from '../src';
import ERR from '../src/err';

let jm = _();
describe('err', function () {
    it('jm.ERR', function () {
        expect(ERR).to.be.a('function');
        expect(jm.ERR).to.be.an('object');
    });
});
