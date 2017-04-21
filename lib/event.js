'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __createListener = function __createListener(fn, caller) {
    return {
        fn: fn,
        caller: caller || null
    };
};

var __equalsListener = function __equalsListener(l1, l2) {
    return l1.fn === l2.fn && l1.caller === l2.caller;
};

/**
 * Creates a new EventEmitter
 *
 * @class
 */

var EventEmitter = function () {

    /**
     * @constructs
     */
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this._events = {};
        this.addListener = this.on;
    }

    /**
     * Adds a listener
     * @param {String} name
     * @param {Function} fn
     * @param {Object} [caller]
     * @return {EventEmitter}
     */


    _createClass(EventEmitter, [{
        key: 'on',
        value: function on(name, fn, caller) {
            var listener = __createListener(fn, caller);
            if (!this._events[name]) {
                this._events[name] = listener;
            } else if (Array.isArray(this._events[name])) {
                this._events[name].push(listener);
            } else {
                this._events[name] = [this._events[name], listener];
            }
            return this;
        }

        /**
         * Adds a volatile listener.
         * @param {String} name
         * @param {Function} fn
         * @param {Object} [caller]
         * @return {EventEmitter}
         */

    }, {
        key: 'once',
        value: function once(name, fn, caller) {
            var _this = this;

            var listener = __createListener(fn, caller);

            var on = function on(arg1, arg2, arg3, arg4, arg5) {
                _this.removeListener(name, on);
                fn.call(listener.caller || _this, arg1, arg2, arg3, arg4, arg5);
            };

            on.listener = listener;
            this.on(name, on);

            return this;
        }

        /**
         * Removes a listener.
         * @param {String} name
         * @param {Function} fn
         * @param {Object} [caller]
         * @return {EventEmitter}
         */

    }, {
        key: 'removeListener',
        value: function removeListener(name, fn, caller) {
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
        }

        /**
         * Removes all listeners for an event.
         * @param {String} [name]
         * @return {EventEmitter}
         */

    }, {
        key: 'removeAllListeners',
        value: function removeAllListeners(name) {
            if (name === undefined) {
                this._events = {};
                return this;
            }

            if (this._events && this._events[name]) {
                this._events[name] = null;
            }

            return this;
        }

        /**
         * Gets all listeners for a certain event.
         * @param {String} name
         * @return {*}
         */

    }, {
        key: 'listeners',
        value: function listeners(name) {
            if (!this._events[name]) {
                this._events[name] = [];
            }

            if (!Array.isArray(this._events[name])) {
                this._events[name] = [this._events[name]];
            }

            return this._events[name];
        }

        /**
         * Emits an event.
         * tip: use arg1...arg5 instead of arguments for performance consider.
         * @param {String} name
         * @param {*} arg1
         * @param {*} arg2
         * @param {*} arg3
         * @param {*} arg4
         * @param {*} arg5
         * @return {EventEmitter}
         */

    }, {
        key: 'emit',
        value: function emit(name, arg1, arg2, arg3, arg4, arg5) {
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
    }]);

    return EventEmitter;
}();

var prototype = EventEmitter.prototype;
var EM = {
    _events: {},
    on: prototype.on,
    once: prototype.once,
    addListener: prototype.on,
    removeListener: prototype.removeListener,
    removeAllListeners: prototype.removeAllListeners,
    listeners: prototype.listeners,
    emit: prototype.emit
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

var _module = function _module($) {
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
exports.module = _module;