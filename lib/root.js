'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.enableModule = exports.Root = undefined;

var _jmErr = require('jm-err');

var _jmErr2 = _interopRequireDefault(_jmErr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
            var _err = new Error(this.ERR.FA_PARAMS.msg);
            if (cb) cb(_err, this.ERR.FA_PARAMS);else throw new Error($.ERR.FA_PARAMS.msg);
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

/**
 * root
 */

var Root =

/**
 * create a root
 */
function Root() {
    _classCallCheck(this, Root);

    _jmErr2.default.enableErr(this);
    enableModule(this);
    this.enableModule = enableModule;
};

exports.default = Root;
exports.Root = Root;
exports.enableModule = enableModule;