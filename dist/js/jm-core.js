(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    if (obj.emit !== undefined) return;
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
};

var disableEvent = function disableEvent(obj) {
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

var moduleEvent = function moduleEvent($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'event';

    $.enableEvent = enableEvent;
    $.disableEvent = disableEvent;

    return {
        name: name,
        unuse: function unuse($) {
            delete $.enableEvent;
            delete $.disableEvent;
        }
    };
};

exports.default = EventEmitter;
exports.EventEmitter = EventEmitter;
exports.enableEvent = enableEvent;
exports.disableEvent = disableEvent;
exports.moduleEvent = moduleEvent;
},{}],2:[function(require,module,exports){
(function (global){
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
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./event":1,"./logger":3,"./random":4,"./root":5,"./tag":6,"./utils":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getLogger = function getLogger(loggerCategoryName) {
    console.debug || (console.debug = console.log);
    return console;
};

var moduleLogger = function moduleLogger($) {
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

exports.default = getLogger;
exports.getLogger = getLogger;
exports.moduleLogger = moduleLogger;
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var iRandomMax = 200000000000; // 最大随机整数范围 0 <= randomValue <= iRandomMax;

/**
 * create new Random
 * @class
 */

var Random = function () {

    /**
     * constructor
     * @param {Object} [opts]
     */
    function Random() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Random);

        this.seed = opts.seed || Date.now();
        this.randomMax = opts.randomMax || iRandomMax;
    }

    /**
     *
     * @return {number}
     */


    _createClass(Random, [{
        key: 'random',
        value: function random() {
            this.seed = (this.seed * 9301 + 49297) % 233280;
            return this.seed / 233280.0;
        }

        /**
         * min<=result<=max
         * @param {number} min
         * @param {number} max
         * @return {number}
         */

    }, {
        key: 'randomInt',
        value: function randomInt(min, max) {
            if (max === undefined) {
                max = min;
                min = 0;
            }
            var range = min + this.random() * (max - min);
            return Math.round(range);
        }

        /**
         * min<=result<=max
         * @param {number} min
         * @param {number} max
         * @return {number}
         */

    }, {
        key: 'randomDouble',
        value: function randomDouble(min, max) {
            if (max === undefined) {
                max = min;
                min = 0.0;
            }

            var range = min + this.random() * (max - min);
            return range;
        }

        /**
         *
         * @param {number} range
         * @return {number}
         */

    }, {
        key: 'randomRange',
        value: function randomRange(range) {
            return this.randomInt(0, this.randomMax) % range;
        }

        /**
         *
         * @param {number} range
         * @param {number} odds
         * @return {number}
         */

    }, {
        key: 'randomOdds',
        value: function randomOdds(range, odds) {
            if (this.randomRange(range) < odds) return 1;
            return 0;
        }
    }]);

    return Random;
}();

var moduleRandom = function moduleRandom($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'random';

    $.random = function (opts) {
        return new Random(opts);
    };

    return {
        name: name,
        unuse: function unuse($) {
            delete $.random;
        }
    };
};

exports.default = Random;
exports.Random = Random;
exports.moduleRandom = moduleRandom;
},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.enableModule = exports.Root = undefined;

var _jmErr = require('jm-err');

var _jmErr2 = _interopRequireDefault(_jmErr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _use = function _use($, modules, fn, opts, cb) {
    var m = fn($, opts, cb);
    if (m && m.name) {
        modules[m.name] = m;
    }
    return m;
};

/**
 * 为对象添加模块支持
 * @method enableModule
 * @param {Object} $ 目标对象
 * @return {Boolean} true 成功 false 失败
 */
var enableModule = function enableModule($) {
    if ($.use !== undefined) return false;
    var _modules = {};

    Object.defineProperty($, 'modules', {
        value: _modules,
        writable: false
    });

    $.use = function (fn, opts, cb) {
        if (typeof fn === 'function') {
            _use(this, _modules, fn, opts, cb);
        } else {
            var _err = new Error(this.ERR.FA_PARAMS.msg);
            if (cb) cb(_err, this.ERR.FA_PARAMS);else throw new Error($.ERR.FA_PARAMS.msg);
        }
        return this;
    };

    $.unuse = function (nameOrModule) {
        var m = nameOrModule;
        if (typeof m === 'string') m = _modules[m];
        if (m && m.unuse) {
            if (m.name) {
                delete _modules[m.name];
            }
            m.unuse(this);
        }
        return this;
    };

    return true;
};

/**
 * root
 */

var Root =

/**
 * create a root
 */
function Root() {
    _classCallCheck(this, Root);

    _jmErr2.default.enableErr(this);
    enableModule(this);
    this.enableModule = enableModule;
};

exports.default = Root;
exports.Root = Root;
exports.enableModule = enableModule;
},{"jm-err":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.moduleTag = exports.disableTag = exports.enableTag = exports.TagObject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = require('./event');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Object with tag enabled
 */
var TagObject = function (_EventEmitter) {
    _inherits(TagObject, _EventEmitter);

    /**
     * create a tagObject
     */
    function TagObject() {
        _classCallCheck(this, TagObject);

        var _this = _possibleConstructorReturn(this, (TagObject.__proto__ || Object.getPrototypeOf(TagObject)).call(this));

        _this._tags = [];
        Object.defineProperty(_this, 'tags', {
            value: _this._tags,
            writable: false
        });
        return _this;
    }

    /**
     * destroy, remove all tags
     */


    _createClass(TagObject, [{
        key: 'destroy',
        value: function destroy() {
            this.emit('destroy', this);
            this.removeAllTags();
        }

        /**
         * check if has a tag
         * @param {String} tag
         * @return {boolean}
         */

    }, {
        key: 'hasTag',
        value: function hasTag(tag) {
            var tags = this._tags;
            return tags.indexOf(tag) != -1;
        }

        /**
         * check if has any one of tags
         * @param  {String[]} tags
         * @return {boolean}
         */

    }, {
        key: 'hasTagAny',
        value: function hasTagAny(tags) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var t = _step.value;

                    if (this.hasTag(t)) return true;
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

            return false;
        }

        /**
         * check if has any all of tags
         * @param {String[]} tags
         * @return {boolean}
         */

    }, {
        key: 'hasTagAll',
        value: function hasTagAll(tags) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var t = _step2.value;

                    if (!this.hasTag(t)) return false;
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

            return true;
        }

        /**
         * add a tag
         * @param {String} tag
         * @return {TagObject}
         */

    }, {
        key: 'addTag',
        value: function addTag(tag) {
            var tags = this._tags;
            if (this.hasTag(tag)) return this;
            tags.push(tag);
            this.emit('addTag', tag);
            return this;
        }

        /**
         * add tags
         * @param {String[]} tags
         * @return {TagObject}
         */

    }, {
        key: 'addTags',
        value: function addTags(tags) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = tags[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var t = _step3.value;

                    this.addTag(t);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return this;
        }

        /**
         * remove a tag
         * @param {String} tag
         * @return {TagObject}
         */

    }, {
        key: 'removeTag',
        value: function removeTag(tag) {
            var tags = this._tags;
            var idx = tags.indexOf(tag);
            if (idx >= 0) {
                tags.splice(idx, 1);
            }
            this.emit('removeTag', tag);
            return this;
        }

        /**
         * remove tags
         * @param {String[]} tags
         * @return {TagObject}
         */

    }, {
        key: 'removeTags',
        value: function removeTags(tags) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = tags[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var t = _step4.value;

                    this.removeTag(t);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return this;
        }

        /**
         * remove all tags
         * @return {TagObject}
         */

    }, {
        key: 'removeAllTags',
        value: function removeAllTags() {
            var v = this._tags;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = v[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var t = _step5.value;

                    this.emit('removeTag', t);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            this._tags = [];
            this.emit('removeAllTags');
            return this;
        }
    }]);

    return TagObject;
}(_event.EventEmitter);

var prototype = TagObject.prototype;
var Tag = {
    _tags: [],
    hasTag: prototype.hasTag,
    hasTagAny: prototype.hasTagAny,
    hasTagAll: prototype.hasTagAll,
    addTag: prototype.addTag,
    addTags: prototype.addTags,
    removeTag: prototype.removeTag,
    removeTags: prototype.removeTags,
    removeAllTags: prototype.removeAllTags
};

var enableTag = function enableTag(obj) {
    if (obj._tags != undefined) return;
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = Object.keys(Tag)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var key = _step6.value;

            obj[key] = Tag[key];
        }
    } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
            }
        } finally {
            if (_didIteratorError6) {
                throw _iteratorError6;
            }
        }
    }

    obj._tags = [];
    Object.defineProperty(obj, 'tags', {
        value: obj._tags,
        writable: false
    });
    (0, _event.enableEvent)(obj);
};

var disableTag = function disableTag(obj) {
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
        for (var _iterator7 = Object.keys(Tag)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var key = _step7.value;

            delete obj[key];
        }
    } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
            }
        } finally {
            if (_didIteratorError7) {
                throw _iteratorError7;
            }
        }
    }

    (0, _event.disableEvent)(obj);
};

var moduleTag = function moduleTag($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tag';

    $.enableTag = enableTag;
    $.disableTag = disableTag;

    return {
        name: name,
        unuse: function unuse($) {
            delete $.enableTag;
            delete $.disableTag;
        }
    };
};

exports.default = TagObject;
exports.TagObject = TagObject;
exports.enableTag = enableTag;
exports.disableTag = disableTag;
exports.moduleTag = moduleTag;
},{"./event":1}],7:[function(require,module,exports){
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

exports.default = utils;
exports.utils = utils;
exports.moduleUtils = moduleUtils;
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _err = require('./err');

var _err2 = _interopRequireDefault(_err);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _err2.default;
module.exports = exports['default'];
},{"./err":8}]},{},[2])