(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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
        _this.use(_jmEvent2.default.moduleEvent).use(_jmLogger2.default.moduleLogger).use(_jmUtils2.default.moduleUtils);
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
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./root":2,"jm-event":5,"jm-logger":6,"jm-utils":8}],2:[function(require,module,exports){
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
},{"jm-err":4,"jm-module":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * err module.
 * @module err
 */

/**
 * common error defines
 *
 */
var Err = {
    SUCCESS: {
        err: 0,
        msg: 'Success'
    },

    FAIL: {
        err: 1,
        msg: 'Fail'
    },

    FA_SYS: {
        err: 2,
        msg: 'System Error'
    },

    FA_NETWORK: {
        err: 3,
        msg: 'Network Error'
    },

    FA_PARAMS: {
        err: 4,
        msg: 'Parameter Error'
    },

    FA_BUSY: {
        err: 5,
        msg: 'Busy'
    },

    FA_TIMEOUT: {
        err: 6,
        msg: 'Time Out'
    },

    FA_ABORT: {
        err: 7,
        msg: 'Abort'
    },

    FA_NOTREADY: {
        err: 8,
        msg: 'Not Ready'
    },

    OK: {
        err: 200,
        msg: 'OK'
    },

    FA_BADREQUEST: {
        err: 400,
        msg: 'Bad Request'
    },

    FA_NOAUTH: {
        err: 401,
        msg: 'Unauthorized'
    },

    FA_NOPERMISSION: {
        err: 403,
        msg: 'Forbidden'
    },

    FA_NOTFOUND: {
        err: 404,
        msg: 'Not Found'
    },

    FA_INTERNALERROR: {
        err: 500,
        msg: 'Internal Server Error'
    },

    FA_UNAVAILABLE: {
        err: 503,
        msg: 'Service Unavailable'
    }
};

/**
 * return message from template
 *
 * ```javascript
 * errMsg('sampe ${name} ${value}', {name: 'jeff', value: 123});
 * // return 'sample jeff 123'
 * ```
 *
 * @param {String} msg message template
 * @param {Object} opts params
 * @return {String} final message
 */
var errMsg = function errMsg(msg, opts) {
    if (opts) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.keys(opts)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                msg = msg.split('${' + key + '}').join(opts[key]);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return msg;
};

/**
 * return an Error Object
 * @param {Object|String} E Err object or a message template
 * @param {Object} [opts] params
 * @return {Error}
 */
var err = function err(E, opts) {
    if (typeof E === 'string') {
        E = {
            msg: E
        };
    }
    var msg = errMsg(E.msg, opts);
    var e = new Error(msg);
    E.err && (e.code = E.err);
    return e;
};

/**
 * enable Err Object, errMsg and err function for obj
 * @param {Object} obj target object
 * @param {String} [name] name to bind
 * @return {boolean}
 */
var enableErr = function enableErr(obj) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Err';

    if (obj[name]) return false;
    obj[name] = Err;
    obj.err = err;
    obj.errMsg = errMsg;
    return true;
};

/**
 * disable Err Object, errMsg and err function for obj
 * @param {Object} obj target object
 * @param {String} [name] name to bind
 */
var disableErr = function disableErr(obj) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Err';

    if (!obj[name]) return;
    delete obj[name];
    delete obj.err;
    delete obj.errMsg;
};

/**
 * module usable
 * @param {Object} obj target object
 * @param {String} [name] name to bind
 * @return {{name: string, unuse: unuse}}
 */
var moduleErr = function moduleErr(obj) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Err';

    enableErr(obj, name);

    return {
        name: name,
        unuse: function unuse(obj) {
            disableErr(obj, name);
        }
    };
};

exports.default = {
    Err: Err,
    errMsg: errMsg,
    err: err,
    enableErr: enableErr,
    disableErr: disableErr,
    moduleErr: moduleErr
};
module.exports = exports['default'];
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _err = require('./err');

var _err2 = _interopRequireDefault(_err);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _err2.default;
module.exports = exports['default'];
},{"./err":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * event module.
 * @module event
 */

/**
 * Class representing an eventEmitter.
 *
 * ```javascript
 * // es6
 * let eventEmitter = new EventEmitter();
 * eventEmitter.on('test', (info) => {
 *      console.log(info);
 * });
 * eventEmitter.once('test', (info) => {
 *      // this will be called only one time
 *      console.log(info);
 * });
 * eventEmitter.one('test', (info) => {
 *      // this will be called first
 *      console.log(info);
 * }, true);
 *
 * eventEmitter.emit('test', 'hello eventEmitter');
 * eventEmitter.off('test');
 * ```
 */
var EventEmitter = function () {

    /**
     * Create an eventEmitter.
     */
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this._events = {};
    }

    /**
     * Adds the listener function to the end of the listeners array for the event named eventName.
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.
     *
     * @param {*} eventName - event name
     * @param {Function} fn - listener function
     * @param {boolean} [prepend] - Adds to the beginning of the listeners array if true
     * @return {EventEmitter} - for chaining
     */


    _createClass(EventEmitter, [{
        key: 'on',
        value: function on(eventName, fn, prepend) {
            this._events[eventName] || (this._events[eventName] = []);
            if (prepend) {
                this._events[eventName].unshift(fn);
            } else {
                this._events[eventName].push(fn);
            }
            return this;
        }

        /**
         * Adds a one time listener function for the event named eventName.
         * The next time eventName is triggered, this listener is removed and then invoked.
         *
         * @param {*} eventName - event name
         * @param {Function} fn - listener function
         * @param {boolean} [prepend] - Adds to the beginning of the listeners array if true
         * @return {EventEmitter} - for chaining
         */

    }, {
        key: 'once',
        value: function once(eventName, fn, prepend) {
            var _this = this;

            var on = function on(arg1, arg2, arg3, arg4, arg5) {
                _this.off(eventName, on);
                fn(arg1, arg2, arg3, arg4, arg5);
            };
            return this.on(eventName, on, prepend);
        }

        /**
         * Removes a listener for the event named eventName.
         * Removes all listeners from the listener array for event named eventName if fn is null
         * Removes all listeners from the listener array if eventName is null
         *
         * @param {*} [eventName] - event name
         * @param {Function} [fn] - listener function
         * @return {EventEmitter} - for chaining
         */

    }, {
        key: 'off',
        value: function off(eventName, fn) {
            if (!fn) {
                if (eventName === undefined) {
                    this._events = {};
                } else if (this._events && this._events[eventName]) {
                    delete this._events[eventName];
                }
            } else if (this._events && this._events[eventName]) {
                var list = this._events[eventName];
                for (var i = 0; i < list.length; i++) {
                    if (fn === list[i]) {
                        list.splice(i, 1);
                        if (!list.length) {
                            delete this._events[eventName];
                        }
                        break;
                    }
                }
            }
            return this;
        }

        /**
         * Synchronously calls each of the listeners registered for the event named eventName,
         * in the order they were registered, passing the supplied arguments to each.
         *
         * to break the calls, just return false on listener function.
         * ```javascript
         * // es6
         * let eventEmitter = new EventEmitter();
         * eventEmitter.on('test', (info) => {
         *      // this will be called
         *      console.log(info);
         * });
         * eventEmitter.on('test', (info) => {
         *      // this will be called
         *      return false;  // this break the calls
         * });
         * eventEmitter.on('test', (info) => {
         *      // this will not be called.
         *      console.log(info);
         * });
         * eventEmitter.emit('test', 'hello eventEmitter');
         * ```
         * tip: use arg1...arg5 instead of arguments for performance consider.
         *
         * @param {*} eventName - event name
         * @param {*} arg1
         * @param {*} arg2
         * @param {*} arg3
         * @param {*} arg4
         * @param {*} arg5
         * @return {EventEmitter} - for chaining
         */

    }, {
        key: 'emit',
        value: function emit(eventName, arg1, arg2, arg3, arg4, arg5) {
            // using a copy to avoid error when listener array changed
            var listeners = this.listeners(eventName);
            for (var i = 0; i < listeners.length; i++) {
                var fn = listeners[i];
                if (fn(arg1, arg2, arg3, arg4, arg5) === false) break;
            }
            return this;
        }

        /**
         * Returns an array listing the events for which the emitter has registered listeners.
         * The values in the array will be strings or Symbols.
         * @return {Array}
         */

    }, {
        key: 'eventNames',
        value: function eventNames() {
            return Object.keys(this._events);
        }

        /**
         * Returns a copy of the array of listeners for the event named eventName.
         * @param {*} eventName - event name
         * @return {Array} - listener array
         */

    }, {
        key: 'listeners',
        value: function listeners(eventName) {
            var v = this._events[eventName];
            if (!v) return [];
            var listeners = new Array(v.length);
            for (var i = 0; i < v.length; i++) {
                listeners[i] = v[i];
            }
            return listeners;
        }
    }]);

    return EventEmitter;
}();

var prototype = EventEmitter.prototype;
var EM = {
    _events: {},
    on: prototype.on,
    once: prototype.once,
    off: prototype.off,
    emit: prototype.emit,
    eventNames: prototype.eventNames,
    listeners: prototype.listeners
};

var enableEvent = function enableEvent(obj) {
    if (obj.emit !== undefined) return false;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(EM)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            obj[key] = EM[key];
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    obj._events = {};
    return true;
};

var disableEvent = function disableEvent(obj) {
    if (obj.emit === undefined) return;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = Object.keys(EM)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            delete obj[key];
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
};

var moduleEvent = function moduleEvent(obj) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'event';

    obj.enableEvent = enableEvent;
    obj.disableEvent = disableEvent;

    return {
        name: name,
        unuse: function unuse() {
            delete obj.enableEvent;
            delete obj.disableEvent;
        }
    };
};

exports.default = {
    EventEmitter: EventEmitter,
    enableEvent: enableEvent,
    disableEvent: disableEvent,
    moduleEvent: moduleEvent
};
module.exports = exports['default'];
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getLogger = function getLogger(loggerCategoryName) {
    console.debug || (console.debug = console.log);
    return console;
};

var moduleLogger = function moduleLogger(obj) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'logger';

    obj.getLogger = getLogger;
    obj.logger = getLogger();
    return {
        name: name,
        unuse: function unuse() {
            delete obj.logger;
            delete obj.getLogger;
        }
    };
};

exports.default = {
    logger: getLogger(),
    getLogger: getLogger,
    moduleLogger: moduleLogger
};
module.exports = exports['default'];
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * module.
 * @module module
 */

/**
 * Class representing a modulable object.
 *
 */
var Modulable = function () {

    /**
     * Create an modulable object.
     */
    function Modulable() {
        _classCallCheck(this, Modulable);

        this._modules = {};
    }

    /**
     * modules
     * @return {Object}
     */


    _createClass(Modulable, [{
        key: 'use',


        /**
         * use a module
         * @param {Function} fn module function
         * @param {Object} [opts] params
         * @param {Function} [cb] callback function
         * @return {Modulable} for chaining
         */
        value: function use(fn, opts, cb) {
            var m = fn(this, opts, cb);
            if (m && m.name) {
                this._modules[m.name] = m;
            }
            return this;
        }

        /**
         * unuse a module
         * @param {Object|String} nameOrModule module or name to be unused
         * @return {Modulable} for chaining
         */

    }, {
        key: 'unuse',
        value: function unuse(nameOrModule) {
            var m = nameOrModule;
            if (typeof m === 'string') m = this._modules[m];
            if (m && m.unuse) {
                if (m.name) {
                    delete this._modules[m.name];
                }
                m.unuse();
            }
            return this;
        }
    }, {
        key: 'modules',
        get: function get() {
            return this._modules;
        }
    }]);

    return Modulable;
}();

var prototype = Modulable.prototype;
var M = {
    _modules: {},
    use: prototype.use,
    unuse: prototype.unuse
};

/**
 * enable modulable support for obj
 * @param {Object} obj target object
 * @return {boolean}
 */
var enableModule = function enableModule(obj) {
    if (obj.use !== undefined) return false;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(M)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            obj[key] = M[key];
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    obj._modules = {};

    Object.defineProperty(obj, 'modules', {
        value: obj._modules,
        writable: false
    });

    return true;
};

/**
 * disable modulable support for obj
 * @param {Object} obj target object
 */
var disableModule = function disableModule(obj) {
    if (obj.use === undefined) return;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = Object.keys(M)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            delete obj[key];
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
};

exports.default = {
    Modulable: Modulable,
    enableModule: enableModule,
    disableModule: disableModule
};
module.exports = exports['default'];
},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var utils = {
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

var moduleUtils = function moduleUtils($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utils';

    $[name] = utils;

    return {
        name: name,
        unuse: function unuse($) {
            delete $[name];
        }
    };
};

exports.default = {
    utils: utils,
    moduleUtils: moduleUtils
};
module.exports = exports['default'];
},{}]},{},[1])