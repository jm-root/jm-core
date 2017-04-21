/**
 * 为对象添加ERR变量
 * @method enableErr
 * @param {Object} $ 目标对象
 * @param {String} [name] 绑定名字
 * @return {Boolean} true 成功 false 失败
 */
let enableErr = ($, name = 'ERR') => {
    if ($[name]) return false;
    $[name] = {
        SUCCESS: {
            err: 0,
            msg: 'Success',
        },

        FAIL: {
            err: 1,
            msg: 'Fail',
        },

        FA_SYS: {
            err: 2,
            msg: 'System Error',
        },

        FA_NETWORK: {
            err: 3,
            msg: 'Network Error',
        },

        FA_PARAMS: {
            err: 4,
            msg: 'Parameter Error',
        },

        FA_BUSY: {
            err: 5,
            msg: 'Busy',
        },

        FA_TIMEOUT: {
            err: 6,
            msg: 'Time Out',
        },

        FA_ABORT: {
            err: 7,
            msg: 'Abort',
        },

        FA_NOTREADY: {
            err: 8,
            msg: 'Not Ready',
        },

        OK: {
            err: 200,
            msg: 'OK',
        },

        FA_BADREQUEST: {
            err: 400,
            msg: 'Bad Request',
        },

        FA_NOAUTH: {
            err: 401,
            msg: 'Unauthorized',
        },

        FA_NOPERMISSION: {
            err: 403,
            msg: 'Forbidden',
        },

        FA_NOTFOUND: {
            err: 404,
            msg: 'Not Found',
        },

        FA_INTERNALERROR: {
            err: 500,
            msg: 'Internal Server Error',
        },

        FA_UNAVAILABLE: {
            err: 503,
            msg: 'Service Unavailable',
        },
    };

    return true;
};

let module = ($, name = 'ERR') => {
    enableErr($, name);

    return {
        name: name,
        unuse: function ($) {
            delete $[name];
        },
    };
};

export default enableErr;
export {enableErr, module};
