if (typeof module !== 'undefined' && module.exports) {
    require('../');
}

(function () {
    var logger = jm.getLogger('jm-core:test:event');
    logger.info('******** jm.Event *********');

    var eventHandle = function (opts, intro) {
        var self = this;
        logger.info('1. %s %j %j', self.className, opts, intro);
    };
    var eventHandle2 = function (opts, intro) {
        var self = this;
        logger.info('2. %s %j %j', self.className, opts, intro);
        return false;   //eventHandle3 will not be called before this line block the event.
    };
    var eventHandle3 = function (opts, intro) {
        var self = this;
        logger.info('3. %s %j %j', self.className, opts, intro);
    };

    var bindEvent = function (o) {
        o.on('addTag', eventHandle);
        o.addListener('addTag', eventHandle2);
        o.on('addTag', eventHandle3);
        o.once('addTag', function (opts, intro) {
            logger.info('once addTag %j %j', opts, intro);
        });
        o.emit('addTag', 'tag1', 'tag1 intro');
        o.emit('addTag', 'tag2');
    };

    var o = {};
    jm.enableEvent(o);
    bindEvent(o);

    o = jm.eventEmitter();
    bindEvent(o);

})();


