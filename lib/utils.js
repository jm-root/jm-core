'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var utils = {
    // 高效slice
    slice: function slice(a, start, end) {
        start = start || 0;
        end = end || a.length;
        if (start < 0) start += a.length;
        if (end < 0) end += a.length;
        var r = new Array(end - start);
        for (var i = start; i < end; i++) {
            r[i - start] = a[i];
        }
        return r;
    },

    formatJSON: function formatJSON(obj) {
        return JSON.stringify(obj, null, 2);
    }
};

var _module = function _module($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utils';

    $[name] = utils;

    return {
        name: name,
        unuse: function unuse($) {
            delete $[name];
        }
    };
};

exports.default = utils;
exports.utils = utils;
exports.module = _module;