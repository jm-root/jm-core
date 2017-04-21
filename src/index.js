import Root from './root';
import {moduleLogger} from './logger';
import {moduleUtils} from './utils';
import {moduleRandom} from './random';
import {moduleEvent} from './event';
import {moduleTag} from './tag';

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
            .use(moduleLogger)
            .use(moduleUtils)
            .use(moduleRandom)
            .use(moduleEvent)
            .use(moduleTag)
        ;
    }
}

if (typeof global !== 'undefined' && global) {
    global.jm = new $();
}

export default $;
