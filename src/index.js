import root from './root';
import logger from './logger';
import err from './err';
import utils from './utils';
import Class from './class';
import object from './object';
import random from './random';
import event from './event';
import tag from './tag';

let $ = () => {
    let o = root();
    o.global = {};
    o
        .use(logger)
        .use(utils)
        .use(Class)
        .use(object)
        .use(random)
        .use(event)
        .use(tag)
    ;
    o.enableEvent(o);
    return o;
};

if (typeof global !== 'undefined' && global) {
    global.jm = $();
}

export default $;
export {root, logger, err, utils, Class, object, random, event, tag};
