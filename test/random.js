import chai from 'chai';
let expect = chai.expect;
import _ from '../src';
import {random} from '../src';

let jm = _();
let r = jm.random();
r.seed = Date.now();

describe('random', function () {
    it('jm.Random', function () {
        expect(random).to.be.a('function');
        expect(jm.Random).to.be.a('function');
        expect(r.randomInt(2)).to.within(0, 2);
        expect(r.randomInt(1, 2)).to.within(1, 2);
        expect(r.randomDouble(1, 2)).to.within(1, 2);
    });
});
