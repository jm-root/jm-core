if (typeof module !== 'undefined' && module.exports) {
    require('../');
}

(function(){
    var logger = jm.logger;
    var aop = jm.aop;
    logger.info('******** jm.aop *********');
    var add = function(v1, v2){
        return v1 + v2;
    };
    add = aop.inject(add, function(v1, v2){
        logger.info('before add ' + v1 + ' + ' + v2);
        //return v1 + v1;
        return aop.arguments(4, 5);
    },
    function(v1, v2){
        logger.info('after add ' + v1 + ' + ' + v2);
        //return v1 + v2 + v1;
    });
    logger.info(add(1, 2));
})();

