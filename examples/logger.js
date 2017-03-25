'using strict';

var jm = jm || {};
if (typeof module !== 'undefined' && module.exports) {
    jm = require('../lib');
}

(function(){
    //默认日志
    var logger = jm.logger;
    ['trace','debug','info','warn','error','fatal'].forEach(function(level) {
        logger[level]('logger test: %s %s', level, Date.now());
    });

    //分类日志
    var logger = jm.getLogger('main');
    ['trace','debug','info','warn','error','fatal'].forEach(function(level) {
        logger[level]('logger test: %s %s', level, Date.now());
    });
})();