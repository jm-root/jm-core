if (typeof module !== 'undefined' && module.exports) {
    require('../');
}

var logger = jm.getLogger('jm-core:test:logger');
logger.info('******** jm.logger *********');

var log = function (logger) {
    ['debug', 'info', 'warn', 'error'].forEach(function (level) {
        logger[level](level);
    });

};

log(jm.logger);
log(jm.getLogger('main'));
