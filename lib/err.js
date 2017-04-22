'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 为对象添加ERR变量
 * @method enableErr
 * @param {Object} $ 目标对象
 * @param {String} [name] 绑定名字
 * @return {Boolean} true 成功 false 失败
 */
var enableErr = function enableErr($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ERR';

    if ($[name]) return false;
    var Err = {
        SUCCESS: {
            err: 0,
            msg: 'Success'
        },

        FAIL: {
            err: 1,
            msg: 'Fail'
        },

        FA_SYS: {
            err: 2,
            msg: 'System Error'
        },

        FA_NETWORK: {
            err: 3,
            msg: 'Network Error'
        },

        FA_PARAMS: {
            err: 4,
            msg: 'Parameter Error'
        },

        FA_BUSY: {
            err: 5,
            msg: 'Busy'
        },

        FA_TIMEOUT: {
            err: 6,
            msg: 'Time Out'
        },

        FA_ABORT: {
            err: 7,
            msg: 'Abort'
        },

        FA_NOTREADY: {
            err: 8,
            msg: 'Not Ready'
        },

        OK: {
            err: 200,
            msg: 'OK'
        },

        FA_BADREQUEST: {
            err: 400,
            msg: 'Bad Request'
        },

        FA_NOAUTH: {
            err: 401,
            msg: 'Unauthorized'
        },

        FA_NOPERMISSION: {
            err: 403,
            msg: 'Forbidden'
        },

        FA_NOTFOUND: {
            err: 404,
            msg: 'Not Found'
        },

        FA_INTERNALERROR: {
            err: 500,
            msg: 'Internal Server Error'
        },

        FA_UNAVAILABLE: {
            err: 503,
            msg: 'Service Unavailable'
        }
    };

    var err = function err(name, opts) {
        var E = Err[name];
        var msg = E.msg;
        if (opts) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(opts)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    msg = msg.split('${' + key + '}').join(opts[key]);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        var e = new Error(msg);
        e.code = E.err;
        e.name = name;
        return e;
    };

    $[name] = Err;
    $.err = err;

    return true;
};

var moduleErr = function moduleErr($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ERR';

    enableErr($, name);

    return {
        name: name,
        unuse: function unuse($) {
            delete $[name];
            delete $.err;
        }
    };
};

exports.default = enableErr;
exports.enableErr = enableErr;
exports.moduleErr = moduleErr;