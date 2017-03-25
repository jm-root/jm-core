if (typeof module !== 'undefined' && module.exports) {
    require('../');
}

(function(){
    {
        var logger = jm.logger;
        ['debug','info','warn','error'].forEach(function(level) {
            logger[level]('logger test: %s %s', level, Date.now());
        });
    }

    {
        var logger = jm.getLogger('main');
        ['debug','info','warn','error'].forEach(function(level) {
            logger[level]('logger test: %s %s', level, Date.now());
        });
    }

})();
