if (typeof module !== 'undefined' && module.exports) {
    require('../');
}

(function () {
    var log = function (logger) {
        ['debug', 'info', 'warn', 'error'].forEach(function (level) {
            logger[level](level);
        });

    };

    log(jm.logger);
    log(jm.getLogger('main'));

})();
