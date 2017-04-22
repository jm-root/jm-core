if (typeof module !== 'undefined' && module.exports) {
    require('../');
}

var logger = jm.getLogger('jm-core:test:random');
var random = jm.random();
logger.info('******** jm.random *********');
random.seed = Date.now();
logger.info(random.randomInt(2));
logger.info(random.randomInt(1, 2));
logger.info(random.randomDouble(2));
logger.info(random.randomDouble(1, 2));
