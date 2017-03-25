if (typeof module !== 'undefined' && module.exports) {
    require('../');
}

(function () {
    var logger = jm.logger;
    var random = jm.random();
    logger.info('******** jm.random *********');
    random.seed = Date.now();
    logger.info(random.randomInt(2));
    logger.info(random.randomInt(1, 2));
    logger.info(random.randomDouble(2));
    logger.info(random.randomDouble(1, 2));

})();
