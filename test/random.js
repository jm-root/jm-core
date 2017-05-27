import chai from 'chai';
let expect = chai.expect;
import $ from '../src';

let jm = new $();
let r = jm.random();

describe('random', function () {
    it('jm.Random', function () {
        expect(r.randomInt(2)).to.within(0, 2);
        expect(r.randomInt(1, 2)).to.within(1, 2);
        expect(r.randomDouble(1, 2)).to.within(1, 2);
    });
});
