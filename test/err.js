import chai from 'chai';
let expect = chai.expect;
import _ from '../src';
import {err} from '../src';

let jm = _();
describe('err', function () {
    it('jm.ERR', function () {
        expect(err).to.be.a('function');
        expect(jm.ERR).to.be.an('object');
    });
});
