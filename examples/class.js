var jm = jm || {};
if (typeof module !== 'undefined' && module.exports) {
    jm = require('../');
}

(function(){
    console.info('******** jm.Class *********');
    console.info(jm.Class.prototype);
    var Object = jm.Class.extend({
        _className: 'object',
    });
    var ObjectB = Object.extend({
    });
    console.log(new Object().className);
    console.log(new ObjectB().className);
})();

(function(){
    console.info('******** 类的定义 *********');

    var Object = jm.Class.extend({
        //类的名称
        _className: 'object',

        //构造函数
        ctor: function (opts) {
            this._name = 'test';
        },

        //类的属性定义
        properties: {
            name: { get: 'getName', set: 'setName' }
        },

        getName: function() {
            return this._name;
        },

        setName: function(name) {
            this._name = name;
        },

        //类的方法定义
        method1: function(opts, cb) {
            cb(null, true);
        }
    });

    //test
    var obj = new Object();
    console.log(obj.name);
})();

(function(){
    console.info('******** 类的继承 *********');
    var Object = jm.Class.extend({
        //类的名称
        _className: 'object',

        //构造函数
        ctor: function (opts) {
            console.log('Object ctor called');
            this._name = 'test';
        },

        //类的方法定义
        method1: function(opts, cb) {
            console.log('Object.method1 called');
            cb(null, true);
        }
    });

    var ObjectB = Object.extend({
        //类的名称
        _className: 'objectB',

        //构造函数
        ctor: function (opts) {
            //调用父级构造函数
            this._super(opts);
            this._name = 'testB';
            console.log('ObjectB ctor called');
        },

        //类的方法定义
        method1: function(opts, cb) {
            //调用父级函数
            this._super(opts, cb);
            console.log('ObjectB.method1 called');
        }
    });

    //test
    var obj = new ObjectB();
    obj.method1(null, function(err, doc){
        console.log(doc);
    });
})();
