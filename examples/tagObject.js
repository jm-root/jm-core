if (typeof module !== 'undefined' && module.exports) {
    require('../');
}

(function () {
    console.info('******** jm.TagObject *********');

    var eventHandle = function (opts) {
        var self = this;
        console.info('1. ' + self.className + ' ' + opts);
    };
    var eventHandle2 = function (opts) {
        var self = this;
        console.info('2. ' + self.className + ' ' + opts);
    };

    var bindEvent = function (o) {
        o.on('addTag', eventHandle);
        o.addListener('addTag', eventHandle2);
    };

    var o = {};
    jm.enableTag(o);
    bindEvent(o);
    o.addTag('123');
    console.info('tags ' + JSON.stringify(o.tags));
    o.removeTag('123');
    console.info('tags ' + JSON.stringify(o.tags));

})();
