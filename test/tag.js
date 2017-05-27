import chai from 'chai';
let expect = chai.expect;
import $ from '../src';
import tag from '../src/tag';

let jm = new $();
let o = {};
jm.enableTag(o);
o.addTag('123');
o.addTag('456');

describe('tag', function () {
    it('jm.TagObject', function () {
        expect(tag.enableTag).to.be.a('function');
        expect(o.hasTag('123')).to.be.ok;
        expect(o.hasTag('456')).to.be.ok;
        expect(o.hasTag('1234')).to.not.be.ok;
    });
});
