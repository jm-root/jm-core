import chai from 'chai';
let expect = chai.expect;
import _ from '../src';

describe('root', function () {
    let jm = _();
    it('jm.root', function () {
        expect(jm.global).to.be.an('object');
        expect(jm.modules).to.be.an('object');
    });
    it('unuse', function () {
        jm.unuse('ERR');
        expect(jm.ERR).to.be.equal(undefined);
    });
    it('event', function () {
        jm.on('test', (v) => {
            expect(v).to.be.equal(123);
        });
        jm.emit('test', 123);
    });
});

describe('global', function () {
    it('jm.root', function () {
        expect(jm.global).to.be.an('object');
        expect(jm.modules).to.be.an('object');
    });
    it('unuse', function () {
        jm.unuse('ERR');
        expect(jm.ERR).to.be.equal(undefined);
    });
});

