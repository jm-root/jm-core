'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getLogger = function getLogger(loggerCategoryName) {
    console.debug || (console.debug = console.log);
    return console;
};

exports.default = function ($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'logger';

    $.getLogger = getLogger;
    $.logger = getLogger();
    return {
        name: name,
        unuse: function unuse($) {
            delete $.logger;
            delete $.getLogger;
        }
    };
};

module.exports = exports['default'];