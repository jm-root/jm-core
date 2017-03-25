'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getLogger = function getLogger(loggerCategoryName) {
    console.debug || (console.debug = console.log);
    return console;
};

exports.default = function (jm) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'logger';

    jm.getLogger = getLogger;
    jm.logger = getLogger();
    return {
        name: name,
        unuse: function unuse(jm) {
            delete jm.logger;
            delete jm.getLogger;
        }
    };
};

module.exports = exports['default'];