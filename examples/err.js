if (typeof module !== 'undefined' && module.exports) {
    require('../');
}

var logger = jm.getLogger('jm-core:test:err');
logger.info('******** jm.ERR *********');
logger.info(jm.utils.formatJSON(jm.ERR));
logger.info(jm.err('SUCCESS'));
