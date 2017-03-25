"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getLogger = function getLogger(loggerCategoryName) {
    console.debug || (console.debug = console.log);
    return console;
};

exports.default = function (jm) {
    jm.getLogger = getLogger;
    jm.logger = getLogger();
};

module.exports = exports["default"];