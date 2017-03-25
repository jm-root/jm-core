"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (jm) {
    jm.utils = {
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
};

module.exports = exports["default"];