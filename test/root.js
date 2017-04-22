import chai from 'chai';
let expect = chai.expect;
import $ from '../src';

describe('root', function () {
    let jm = new $();
    it('jm.root', function () {
        expect(jm.global).to.be.an('object');
        expect(jm.modules).to.be.an('object');
    });
    it('unuse', function () {
        jm.unuse('tag');
        expect(jm.TagObject).to.be.equal(undefined);
    });
});

describe('global', function () {
    it('jm', function () {
        jm.logger.info('modules: %s', jm.utils.formatJSON(jm.modules));
        expect(jm.global).to.be.an('object');
        expect(jm.modules).to.be.an('object');
    });
    it('unuse', function () {
        jm.unuse('tag');
        expect(jm.TagObject).to.be.equal(undefined);
    });
});
