import event from 'jm-event';
import logger from 'jm-logger';
import utils from 'jm-utils';
import err from 'jm-err';
import mdl from 'jm-module';

/**
 * @class
 */
class JM {

    /**
     * @constructor
     */
    constructor () {
        this.global = {};
        err.enableErr(this);
        mdl.enableModule(this);
        this.enableModule = mdl.enableModule;
        this.disableModule = mdl.disableModule;
        this
            .use(event.moduleEvent)
            .use(logger.moduleLogger)
            .use(utils.moduleUtils)
        ;
    }
}

if (typeof global !== 'undefined' && global) {
    !global.JM && (global.JM = JM);
}

export default JM;
