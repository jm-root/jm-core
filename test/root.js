import chai from 'chai';
let expect = chai.expect;
import JM from '../src';

describe('root', function() {
    let jm = JM();
    it('jm.root', function() {
        expect(jm.root).to.be.an('object');
        expect(jm.root.registries).to.be.an('object');
    });
});

describe('global', function() {
    it('jm.root', function() {
        expect(jm.root).to.be.an('object');
        expect(jm.root.registries).to.be.an('object');
    });
});
