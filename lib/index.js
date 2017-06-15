'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jmEvent = require('jm-event');

var _jmEvent2 = _interopRequireDefault(_jmEvent);

var _jmLogger = require('jm-logger');

var _jmLogger2 = _interopRequireDefault(_jmLogger);

var _jmUtils = require('jm-utils');

var _jmUtils2 = _interopRequireDefault(_jmUtils);

var _jmErr = require('jm-err');

var _jmErr2 = _interopRequireDefault(_jmErr);

var _jmModule = require('jm-module');

var _jmModule2 = _interopRequireDefault(_jmModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 */
var JM =

/**
 * @constructor
 */
function JM() {
    _classCallCheck(this, JM);

    this.global = {};
    _jmErr2.default.enableErr(this);
    _jmModule2.default.enableModule(this);
    this.enableModule = _jmModule2.default.enableModule;
    this.disableModule = _jmModule2.default.disableModule;
    this.use(_jmEvent2.default.moduleEvent).use(_jmLogger2.default.moduleLogger).use(_jmUtils2.default.moduleUtils);
};

if (typeof global !== 'undefined' && global) {
    !global.JM && (global.JM = JM);
}

exports.default = JM;
module.exports = exports['default'];