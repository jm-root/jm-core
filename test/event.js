import chai from 'chai';
let expect = chai.expect;
import $ from '../src';
import event from 'jm-event';
let EventEmitter = event.EventEmitter;

let jm = new $();

describe('event', function () {
    let test1 = function (o) {
        let i = 0;
        o.on('test', function (v) {
            expect(v).to.be.equal('123');
            i++;
        });
        o.on('test', function (v) {
            expect(v).to.be.equal('123');
            i++;
            return false; // this will break the calls
        });
        o.on('test', function (v) {
            // this will not be called
            expect(v).to.be.equal('123');
            i++;
        });
        o.emit('test', '123');
        expect(i).to.be.equal(2);
    };

    it('EventEmitter', function () {
        let o = new EventEmitter();
        test1(o);
    });

    it('caller', function () {
        let caller = {};
        let o = {};
        jm.enableEvent(o);
        o.on('test', function (v) {
            expect(this).to.be.equal(caller);
            expect(v).to.be.equal(12);
        }.bind(caller, 12));
        o.emit('test', '123');
    });

    it('once', function () {
        let o = {};
        jm.enableEvent(o);
        let i = 0;
        o.once('test', (v) => {
            expect(v).to.be.equal('123');
            i++;
        });
        o.emit('test', '123');
        o.emit('test', '123');
        expect(i).to.be.equal(1);
    });

    it('prepend', function () {
        let o = {};
        jm.enableEvent(o);
        o.on('test', (v) => {
            console.log('should be 2');
        });
        o.on('test', (v) => {
            console.log('should be 1');
        }, true);
        o.on('test', (v) => {
            console.log('should be 3');
        });
        o.once('test', (v) => {
            console.log('should be 0');
        }, true);
        o.emit('test', '123');
        o.emit('test', '123');
    });

    it('off', function () {
        let o = {};
        jm.enableEvent(o);
        let i = 0;
        o.on('test', (v) => {
            i++;
        });
        o.emit('test', '123');
        o.off('test');
        o.emit('test', '123');
        expect(i).to.be.equal(1);
        expect(o.listeners('test').length).to.be.equal(0);
    });

    it('jm.enableEvent', function () {
        let o = {};
        jm.enableEvent(o);
        test1(o);
    });
});
