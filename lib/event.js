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