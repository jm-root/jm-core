import Root from './root';
import logger from './logger';
import utils from './utils';
import {module as random} from './random';
import {module as event} from './event';
import {module as tag} from './tag';

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
            .use(logger)
            .use(utils)
            .use(random)
            .use(event)
            .use(tag)
        ;
    }
}

if (typeof global !== 'undefined' && global) {
    global.jm = new $();
}

export default $;
