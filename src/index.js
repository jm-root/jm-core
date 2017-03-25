import root from './root';
import logger from './logger';
import err from './err';
import utils from './utils';
import Class from './class';
import object from './object';
import random from './random';
import event from './event';
import tag from './tag';

let jm = () => {
    let o = {
        global: {}
    };
    root(o);
    o
        .use(logger)
        .use(err)
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
    global.jm = jm();
}

export default jm;
