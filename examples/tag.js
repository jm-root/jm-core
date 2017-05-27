if (typeof module !== 'undefined' && module.exports) {
    require('../');
}

var logger = jm.getLogger('jm-core:test:tag');
logger.info('******** jm.Tag *********');

var eventHandle = function (opts) {
    var self = this;
    logger.info('1. ' + self.className + ' ' + opts);
};
var eventHandle2 = function (opts) {
    var self = this;
    logger.info('2. ' + self.className + ' ' + opts);
};

var bindEvent = function (o) {
    o.on('addTag', eventHandle);
    o.on('addTag', eventHandle2);
};

var o = {};
jm.enableTag(o);
bindEvent(o);
o.addTag('123');
logger.info('tags ' + JSON.stringify(o.tags));
o.removeTag('123');
logger.info('tags ' + JSON.stringify(o.tags));
