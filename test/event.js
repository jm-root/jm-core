import chai from 'chai';
let expect = chai.expect;
import $ from '../src';
import event from '../src';

let jm = $()
        .use(event)
    ;

describe('event', function () {
    it('jm.EventEmitter', function () {
        expect(jm.EventEmitter).to.be.a('function');
        expect(jm.eventEmitter).to.be.an('function');
        let o = jm.eventEmitter();
        o.on('test', function (v) {
            expect(v).to.be.equal('123');
        });
        o.emit('test', '123');
    });

    it('once', function () {
        let o = jm.eventEmitter();
        o.once('test', function (v) {
            expect(v).to.be.equal('123');
        });
        o.emit('test', '123');
    });

    it('caller', function () {
        let caller = {};
        let o = jm.eventEmitter();
        o.on('test', function (v) {
            expect(this === caller).to.be.ok;
        }, caller);
        o.emit('test', '123');
    });
});
