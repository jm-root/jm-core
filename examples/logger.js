var jm = jm || {};
if (typeof module !== 'undefined' && module.exports) {
    jm = require('../lib');
}

(function(){
    {
        var logger = jm.logger;
        ['trace','debug','info','warn','error','fatal'].forEach(function(level) {
            logger[level]('logger test: %s %s', level, Date.now());
        });
    }

    {
        var logger = jm.getLogger('main');
        ['trace','debug','info','warn','error','fatal'].forEach(function(level) {
            logger[level]('logger test: %s %s', level, Date.now());
        });
    }

})();