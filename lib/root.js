'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.enableModule = undefined;

var _err = require('./err');

var _use = function _use($, modules, fn, opts, cb) {
    var m = fn($, opts, cb);
    if (m && m.name) {
        modules[m.name] = m;
    }
    return m;
};

/**
 * 为对象添加模块支持
 * @method enableModule
 * @param {Object} $ 目标对象
 * @return {Boolean} true 成功 false 失败
 */
var enableModule = function enableModule($) {
    if ($.use !== undefined) return false;
    var _modules = {};

    Object.defineProperty($, 'modules', {
        value: _modules,
        writable: false
    });

    $.use = function (fn, opts, cb) {
        if (typeof fn === 'function') {
            _use(this, _modules, fn, opts, cb);
        } else {
            var err = new Error(this.ERR.FA_PARAMS.msg);
            if (cb) cb(err, this.ERR.FA_PARAMS);else throw new Error($.ERR.FA_PARAMS.msg);
        }
        return this;
    };

    $.unuse = function (nameOrModule) {
        var m = nameOrModule;
        if (typeof m === 'string') m = _modules[m];
        if (m && m.unuse) {
            if (m.name) {
                delete _modules[m.name];
            }
            m.unuse(this);
        }
        return this;
    };

    return true;
};

exports.default = function () {
    var $ = {};
    (0, _err.enableErr)($);
    enableModule($);
    $.enableModule = enableModule;
    return $;
};

exports.enableModule = enableModule;