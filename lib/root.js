'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _use = function _use(_, fn, name) {
    var m = fn(_, name);
    if (m && m.name) {
        _.root.modules[m.name] = m;
        _.logger && _.logger.info('use ' + m.name);
    }
    return m;
};

exports.default = function () {
    return {
        root: {
            modules: {},
            registries: {}
        },

        use: function use(pathOrFn, name) {
            var fn = pathOrFn;
            if (typeof fn === 'string') {} else if (typeof fn === 'function') {
                _use(this, fn, name);
            }
            return this;
        },

        unuse: function unuse(nameOrModule) {
            var m = nameOrModule;
            if (typeof m === 'string') m = this.root.modules[m];
            if (m) {
                if (m.name) {
                    delete this.root.modules[m.name];
                }
                if (m.unuse) m.unuse(this);
            }
            return this;
        }

    };
};

module.exports = exports['default'];