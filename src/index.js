import Root from './root';
import event from 'jm-event';
import logger from 'jm-logger';
import utils from 'jm-utils';
import rnd from 'jm-random';
import tag from 'jm-tag';

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
            .use(rnd.moduleRandom)
            .use(tag.moduleTag)
        ;
    }
}

if (typeof global !== 'undefined' && global) {
    !global.jm && (global.jm = new $());
    !global.JM && (global.JM = $);
}

export default $;
