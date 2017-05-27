'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jmErr = require('jm-err');

var _jmErr2 = _interopRequireDefault(_jmErr);

var _jmModule = require('jm-module');

var _jmModule2 = _interopRequireDefault(_jmModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a root.
 */
var Root =

/**
 * create a root
 */
function Root() {
    _classCallCheck(this, Root);

    _jmErr2.default.enableErr(this);
    _jmModule2.default.enableModule(this);
    this.enableModule = _jmModule2.default.enableModule;
    this.disableModule = _jmModule2.default.disableModule;
};

exports.default = Root;
module.exports = exports['default'];