(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var fnTest = /xyz/.test(function () {
    xyz;
}) ? /\b_super\b/ : /.*/;

exports.default = function ($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Class';

    // The base Class implementation (does nothing)
    $[name] = function () {};

    // Create a new Class that inherits from this class
    $[name].extend = function (prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        var prototype = Object.create(_super);

        // Copy the properties over onto the new prototype
        for (var _name in prop) {
            if (_name == 'properties') {
                continue;
            }
            // Check if we're overwriting an existing function
            prototype[_name] = typeof prop[_name] == 'function' && typeof _super[_name] == 'function' && fnTest.test(prop[_name]) ? function (name, fn) {
                return function () {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            }(_name, prop[_name]) : prop[_name];
        }

        {
            var properties = prop['properties'];
            if (properties) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Object.keys(properties)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var key = _step.value;

                        var desc = properties[key];
                        if (desc.get && typeof desc.get == 'string') {
                            desc.get = prototype[desc.get];
                        }
                        if (desc.set && typeof desc.set == 'string') {
                            desc.set = prototype[desc.set];
                        }
                        Object.defineProperty(prototype, key, desc);
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
        }

        // The dummy class constructor
        var Class = function Class() {
            if (this._className) {
                Object.defineProperty(this, 'className', {
                    value: this._className,
                    writable: false
                });
            }

            // All construction is actually done in the init method
            if (this.ctor) this.ctor.apply(this, arguments);
        };

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = $[name].extend;

        return Class;
    };

    return {
        name: name,
        unuse: function unuse($) {
            delete $[name];
        }
    };
};

module.exports = exports['default'];
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 为对象添加ERR变量
 * @method enableErr
 * @param {Object} $ 目标对象
 * @param {String} [name] 绑定名字
 * @return {Boolean} true 成功 false 失败
 */
var enableErr = function enableErr($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ERR';

    if ($[name]) return false;
    $[name] = {
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

    return true;
};

exports.default = function ($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ERR';

    enableErr($, name);

    return {
        name: name,
        unuse: function unuse($) {
            delete $[name];
        }
    };
};

exports.enableErr = enableErr;
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __createListener = function __createListener(fn, caller) {
    return {
        fn: fn,
        caller: caller || null
    };
};

var __equalsListener = function __equalsListener(l1, l2) {
    return l1.fn === l2.fn && l1.caller === l2.caller;
};

exports.default = function ($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'event';

    $.EventEmitter = $.Object.extend({
        _className: 'eventEmitter',

        ctor: function ctor() {
            this._events = {};
            this.addListener = this.on;
        },

        /**
         * Adds a listener
         *
         * @api public
         */

        on: function on(name, fn, caller) {
            var listener = __createListener(fn, caller);
            if (!this._events[name]) {
                this._events[name] = listener;
            } else if (Array.isArray(this._events[name])) {
                this._events[name].push(listener);
            } else {
                this._events[name] = [this._events[name], listener];
            }
            return this;
        },

        /**
         * Adds a volatile listener.
         *
         * @api public
         */

        once: function once(name, fn, caller) {
            var _this = this;

            var listener = __createListener(fn, caller);

            var on = function on(arg1, arg2, arg3, arg4, arg5) {
                _this.removeListener(name, on);
                fn.call(listener.caller || _this, arg1, arg2, arg3, arg4, arg5);
            };

            on.listener = listener;
            this.on(name, on);

            return this;
        },

        /**
         * Removes a listener.
         *
         * @api public
         */

        removeListener: function removeListener(name, fn, caller) {
            var listener = __createListener(fn, caller);
            if (this._events && this._events[name]) {
                var list = this._events[name];

                if (Array.isArray(list)) {
                    var pos = -1;

                    for (var i = 0, l = list.length; i < l; i++) {
                        var o = list[i];
                        if (__equalsListener(o, listener) || o.listener && __equalsListener(o.listener, listener)) {
                            pos = i;
                            break;
                        }
                    }

                    if (pos < 0) {
                        return this;
                    }

                    list.splice(pos, 1);

                    if (!list.length) {
                        delete this._events[name];
                    }
                } else if (__equalsListener(list, listener) || list.listener && __equalsListener(list.listener, listener)) {
                    delete this._events[name];
                }
            }

            return this;
        },

        /**
         * Removes all listeners for an event.
         *
         * @api public
         */

        removeAllListeners: function removeAllListeners(name) {
            if (name === undefined) {
                this._events = {};
                return this;
            }

            if (this._events && this._events[name]) {
                this._events[name] = null;
            }

            return this;
        },

        /**
         * Gets all listeners for a certain event.
         *
         * @api publci
         */

        listeners: function listeners(name) {
            if (!this._events[name]) {
                this._events[name] = [];
            }

            if (!Array.isArray(this._events[name])) {
                this._events[name] = [this._events[name]];
            }

            return this._events[name];
        },

        /**
         * Emits an event.
         *
         * tip: use arg1...arg5 instead of arguments for performance consider.
         *
         * @api public
         */

        emit: function emit(name, arg1, arg2, arg3, arg4, arg5) {
            var handler = this._events[name];
            if (!handler) return this;

            if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object' && !Array.isArray(handler)) {
                handler.fn.call(handler.caller || this, arg1, arg2, arg3, arg4, arg5);
            } else if (Array.isArray(handler)) {
                var listeners = new Array(handler.length);
                for (var i = 0; i < handler.length; i++) {
                    listeners[i] = handler[i];
                }

                for (var _i = 0, l = listeners.length; _i < l; _i++) {
                    var h = listeners[_i];
                    if (h.fn.call(h.caller || this, arg1, arg2, arg3, arg4, arg5) === false) break;
                }
            }
            return this;
        }
    });

    $.eventEmitter = function () {
        return new $.EventEmitter();
    };

    var prototype = $.EventEmitter.prototype;
    var EventEmitter = {
        _events: {},
        on: prototype.on,
        once: prototype.once,
        addListener: prototype.on,
        removeListener: prototype.removeListener,
        removeAllListeners: prototype.removeAllListeners,
        listeners: prototype.listeners,
        emit: prototype.emit
    };

    var em = EventEmitter;
    $.enableEvent = function (obj) {
        if (obj._events !== undefined) return;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.keys(em)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                obj[key] = em[key];
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
        return this;
    };

    $.disableEvent = function (obj) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = Object.keys(em)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

        return this;
    };

    return {
        name: name,
        unuse: function unuse($) {
            delete $.EventEmitter;
            delete $.eventEmitter;
            delete $.enableEvent;
            delete $.disableEvent;
        }
    };
};

module.exports = exports['default'];
},{}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tag = exports.event = exports.random = exports.object = exports.Class = exports.utils = exports.err = exports.logger = exports.root = undefined;

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

var $ = function $() {
    var o = (0, _root2.default)();
    o.global = {};
    o.use(_logger2.default).use(_utils2.default).use(_class2.default).use(_object2.default).use(_random2.default).use(_event2.default).use(_tag2.default);
    o.enableEvent(o);
    return o;
};

if (typeof global !== 'undefined' && global) {
    global.jm = $();
}

exports.default = $;
exports.root = _root2.default;
exports.logger = _logger2.default;
exports.err = _err2.default;
exports.utils = _utils2.default;
exports.Class = _class2.default;
exports.object = _object2.default;
exports.random = _random2.default;
exports.event = _event2.default;
exports.tag = _tag2.default;
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./class":1,"./err":2,"./event":3,"./logger":5,"./object":6,"./random":7,"./root":8,"./tag":9,"./utils":10}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function ($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'object';

    $.Object = $.Class.extend({
        _className: 'object',

        attr: function attr(attrs) {
            for (var key in attrs) {
                if (key === 'className') {
                    continue;
                }

                this[key] = attrs[key];
            }
        }
    });

    $.object = function () {
        return new $.Object();
    };

    return {
        name: name,
        unuse: function unuse($) {
            delete $.Object;
            delete $.object;
        }
    };
};

module.exports = exports['default'];
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var iRandomMax = 200000000000; // 最大随机整数范围 0 <= randomValue <= iRandomMax;

exports.default = function ($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'random';

    $.Random = $.Class.extend({
        _className: 'random',

        properties: {
            seed: {
                get: 'getSeed',
                set: 'setSeed'
            }
        },

        ctor: function ctor(opts) {
            opts = opts || {};
            this.g_seed = 0;
            this.randomMax = opts.randomMax || iRandomMax;
        },

        setSeed: function setSeed(seed) {
            this.g_seed = seed;
        },

        getSeed: function getSeed() {
            return this.g_seed;
        },

        random: function random() {
            this.g_seed = (this.g_seed * 9301 + 49297) % 233280;
            return this.g_seed / 233280.0;
        },

        // min<=result<=max
        randomInt: function randomInt(min, max) {
            if (max === undefined) {
                max = min;
                min = 0;
            }
            var range = min + this.random() * (max - min);
            return Math.round(range);
        },

        // min<=result<=max
        randomDouble: function randomDouble(min, max) {
            if (max === undefined) {
                max = min;
                min = 0.0;
            }

            var range = min + this.random() * (max - min);
            return range;
        },

        randomRange: function randomRange(range) {
            return this.randomInt(0, this.randomMax) % range;
        },

        randomOdds: function randomOdds(range, odds) {
            if (this.randomRange(range) < odds) return 1;
            return 0;
        }
    });

    $.random = function (opts) {
        return new $.Random(opts);
    };

    return {
        name: name,
        unuse: function unuse($) {
            delete $.Random;
            delete $.random;
        }
    };
};

module.exports = exports['default'];
},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.enableModule = undefined;

var _err = require('./err');

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
            var err = new Error(this.ERR.FA_PARAMS.msg);
            if (cb) cb(err, this.ERR.FA_PARAMS);else throw new Error($.ERR.FA_PARAMS.msg);
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

exports.default = function () {
    var $ = {};
    (0, _err.enableErr)($);
    enableModule($);
    $.enableModule = enableModule;
    return $;
};

exports.enableModule = enableModule;
},{"./err":2}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function ($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tag';

    $.TagObject = $.EventEmitter.extend({
        _className: 'tagObject',

        ctor: function ctor() {
            this._super();
            this._tags = [];
            Object.defineProperty(this, 'tags', {
                value: this._tags,
                writable: false
            });
        },

        destroy: function destroy() {
            this.emit('destroy', this);
            this.removeAllTags();
        },

        hasTag: function hasTag(tag) {
            var tags = this._tags;
            return tags.indexOf(tag) != -1;
        },

        hasTagAny: function hasTagAny(tags) {
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
        },

        hasTagAll: function hasTagAll(tags) {
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
        },

        addTag: function addTag(tag) {
            var tags = this._tags;
            if (this.hasTag(tag)) return this;
            tags.push(tag);
            this.emit('addTag', tag);
            return this;
        },

        addTags: function addTags(tags) {
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
        },

        removeTag: function removeTag(tag) {
            var tags = this._tags;
            var idx = tags.indexOf(tag);
            if (idx >= 0) {
                tags.splice(idx, 1);
            }
            this.emit('removeTag', tag);
            return this;
        },

        removeTags: function removeTags(tags) {
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
        },

        removeAllTags: function removeAllTags() {
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

    });

    $.tagObject = function () {
        return new $.TagObject();
    };

    var prototype = $.TagObject.prototype;
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

    $.enableTag = function (obj) {
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
        $.enableEvent(obj);
    };

    $.disableTag = function (obj) {
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

        $.disableEvent(obj);
    };

    return {
        name: name,
        unuse: function unuse($) {
            delete $.TagObject;
            delete $.tagObject;
            delete $.enableTag;
            delete $.disableTag;
        }
    };
};

module.exports = exports['default'];
},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function ($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utils';

    $[name] = {
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

    return {
        name: name,
        unuse: function unuse($) {
            delete $[name];
        }
    };
};

module.exports = exports['default'];
},{}]},{},[4])