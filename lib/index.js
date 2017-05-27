'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

var _jmEvent = require('jm-event');

var _jmEvent2 = _interopRequireDefault(_jmEvent);

var _jmLogger = require('jm-logger');

var _jmLogger2 = _interopRequireDefault(_jmLogger);

var _jmUtils = require('jm-utils');

var _jmUtils2 = _interopRequireDefault(_jmUtils);

var _jmRandom = require('jm-random');

var _jmRandom2 = _interopRequireDefault(_jmRandom);

var _jmTag = require('jm-tag');

var _jmTag2 = _interopRequireDefault(_jmTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 */
var $ = function (_Root) {
    _inherits($, _Root);

    /**
     * @constructor
     */
    function $() {
        _classCallCheck(this, $);

        var _this = _possibleConstructorReturn(this, ($.__proto__ || Object.getPrototypeOf($)).call(this));

        _this.global = {};
        _this.use(_jmEvent2.default.moduleEvent).use(_jmLogger2.default.moduleLogger).use(_jmUtils2.default.moduleUtils).use(_jmRandom2.default.moduleRandom).use(_jmTag2.default.moduleTag);
        return _this;
    }

    return $;
}(_root2.default);

if (typeof global !== 'undefined' && global) {
    !global.jm && (global.jm = new $());
    !global.JM && (global.JM = $);
}

exports.default = $;
module.exports = exports['default'];