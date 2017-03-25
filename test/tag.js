import chai from 'chai';
let expect = chai.expect;
import _ from '../src';
import {tag} from '../src';

let jm = _();
let t = jm.tagObject();

var o = {};
jm.enableTag(o);
o.addTag('123');
o.addTag('456');

describe('tag', function () {
    it('jm.TagObject', function () {
        expect(tag).to.be.a('function');
        expect(jm.TagObject).to.be.a('function');
        expect(o.hasTag('123')).to.be.ok;
        expect(o.hasTag('456')).to.be.ok;
        expect(o.hasTag('1234')).to.not.be.ok;
    });
});
