import root from './root';
import err from './err';
import logger from './logger';
import aop from './aop';
import utils from './utils';
import Class from './class';
import object from './object';
import random from './random';
import event from './event';
import tag from './tag';

let jm = () => {
    let o = {
        use: (m) => {
            m(o);
            return o;
        },
    };
    o
        .use(root)
        .use(err)
        .use(logger)
        .use(aop)
        .use(utils)
        .use(Class)
        .use(object)
        .use(random)
        .use(event)
        .use(tag)
    ;
    return o;
};

if (typeof global !== 'undefined' && global) {
    global.jm = jm();
}

export default jm;
