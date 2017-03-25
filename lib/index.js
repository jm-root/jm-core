'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _err = require('./err');

var _err2 = _interopRequireDefault(_err);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _class = require('./class');

var _class2 = _interopRequireDefault(_class);

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _random = require('./random');

var _random2 = _interopRequireDefault(_random);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jm = function jm() {
    var o = {
        global: {}
    };
    (0, _root2.default)(o);
    o.use(_logger2.default).use(_err2.default).use(_utils2.default).use(_class2.default).use(_object2.default).use(_random2.default).use(_event2.default).use(_tag2.default);
    o.enableEvent(o);
    return o;
};

if (typeof global !== 'undefined' && global) {
    global.jm = jm();
}

exports.default = jm;
module.exports = exports['default'];