import Root from './root';
import event from 'jm-event';
import {moduleLogger} from './logger';
import {moduleUtils} from './utils';
import {moduleRandom} from './random';
import tag from './tag';

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
            .use(moduleLogger)
            .use(moduleUtils)
            .use(moduleRandom)
            .use(tag.moduleTag)
        ;
    }
}

if (typeof global !== 'undefined' && global) {
    !global.jm && (global.jm = new $());
    !global.JM && (global.JM = $);
}

export default $;
