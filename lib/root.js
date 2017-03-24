"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var root = {
    registries: {}
};

exports.default = function (jm) {
    jm.root = root;
    return jm;
};

module.exports = exports["default"];