'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

var _logger = require('./logger');

var _utils = require('./utils');

var _random = require('./random');

var _event = require('./event');

var _tag = require('./tag');

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
        _this.use(_logger.moduleLogger).use(_utils.moduleUtils).use(_random.moduleRandom).use(_event.moduleEvent).use(_tag.moduleTag);
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