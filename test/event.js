import chai from 'chai';
let expect = chai.expect;
import $ from '../src';

let jm = new $();

describe('event', function () {
    it('jm.EventEmitter', function () {
        let o = {};
        jm.enableEvent(o);
        o.on('test', function (v) {
            expect(v).to.be.equal('123');
        });
        o.emit('test', '123');
    });

    it('once', function () {
        let o = {};
        jm.enableEvent(o);
        o.once('test', function (v) {
            expect(v).to.be.equal('123');
        });
        o.emit('test', '123');
    });

    it('caller', function () {
        let caller = {};
        let o = {};
        jm.enableEvent(o);
        o.on('test', function (v) {
            expect(this === caller).to.be.ok;
        }, caller);
        o.emit('test', '123');
    });
});
