'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _use = function _use(_, fn, name) {
    var m = fn(_, name);
    if (m && m.name) {
        _.modules[m.name] = m;
    }
    return m;
};

exports.default = function ($) {
    $.modules = {};
    $.use = function (pathOrFn, name) {
        var fn = pathOrFn;
        if (typeof fn === 'string') {} else if (typeof fn === 'function') {
            _use(this, fn, name);
        }
        return this;
    };
    $.unuse = function (nameOrModule) {
        var m = nameOrModule;
        if (typeof m === 'string') m = this.modules[m];
        if (m) {
            if (m.name) {
                delete this.modules[m.name];
            }
            if (m.unuse) m.unuse(this);
        }
        return this;
    };

    return {
        name: 'root'
    };
};

module.exports = exports['default'];