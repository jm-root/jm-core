import chai from 'chai';
let expect = chai.expect;
import _ from '../src';
import {Class} from '../src';

let jm = _();

var Object = jm.Class.extend({
    // 类的名称
    _className: 'object',

    // 构造函数
    ctor: function (opts) {
        this._name = 'test';
    },

    // 类的属性定义
    properties: {
        name: {get: 'getName', set: 'setName'}
    },

    getName: function () {
        return this._name;
    },

    setName: function (name) {
        this._name = name;
    },

    // 类的方法定义
    method1: function (opts, cb) {
        cb(null, true);
    }
});

var Object2 = Object.extend({
    // 类的名称
    _className: 'object2',

    // 构造函数
    ctor: function (opts) {
        this._super(opts);
        this._name = 'test';
    },

    // 类的方法定义
    method1: function (opts, cb) {
        cb(null, false);
    }
});

// test
var obj = new Object();
obj.name = 'obj';
var obj2 = new Object2();
obj2.name = 'obj2';

describe('class', function () {
    it('jm.Class.prototype', function () {
        expect(jm.Class).to.be.a('function');
        expect(Class).to.be.a('function');
        expect(obj).to.be.an('object');
        expect(obj._name).to.be.equal('obj');
        expect(obj2._name).to.be.equal('obj2');
    });
});
