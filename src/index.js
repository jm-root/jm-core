import Root from './root';
import event from 'jm-event';
import logger from 'jm-logger';
import utils from 'jm-utils';

/**
 * @class
 */
class $ extends Root {

    /**
     * @constructor
     */
    constructor () {
        super();
        this.global = {};
        this
            .use(event.moduleEvent)
            .use(logger.moduleLogger)
            .use(utils.moduleUtils)
        ;
    }
}

if (typeof global !== 'undefined' && global) {
    !global.jm && (global.jm = new $());
    !global.JM && (global.JM = $);
}

export default $;
