import chai from 'chai';
let expect = chai.expect;
import JM from '../src';

let jm = JM();
describe('root', function() {
    it('jm.root', function() {
        expect(jm.root).to.be.an('object');
        expect(jm.root.registries).to.be.an('object');
    });
});
