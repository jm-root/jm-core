var jm = jm || {};
if (typeof module !== 'undefined' && module.exports) {
    jm = require('../');
}

(function(){
    console.info('******** jm.Event *********');

    console.info(jm.EventEmitter.prototype);

    var eventHandle = function(opts){
        var self = this;
        console.info('1. ' + self.className + ' '  + opts);
    };
    var eventHandle2 = function(opts){
        var self = this;
        console.info('2. ' + self.className + ' '  + opts);
    };

    var bindEvent = function(o){
        o.on('addTag', eventHandle);
        o.addListener('addTag', eventHandle2);
        o.emit('addTag', 'tag1');
    };

    var o = {};
    jm.enableEvent(o);
    bindEvent(o);
    console.info(JSON.stringify(o));


    o = jm.eventEmitter();
    bindEvent(o);
    console.info(JSON.stringify(o));


})();


