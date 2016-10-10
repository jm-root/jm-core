var jm = jm || {};
if (typeof module !== 'undefined' && module.exports) {
    jm = require('./root.js');
}

(function(){
    jm.EventEmitter = jm.Object.extend({
        _className: 'eventEmitter',

        ctor: function () {
            this._events = {};
            this.addListener = this.on;
        },

        __createListener: function(fn, caller) {
            caller = caller;
            return {
                fn: fn,
                caller: caller
            };
        },

        __equalsListener: function (listener1, listener2) {
            return listener1.fn === listener2.fn && listener1.caller === listener2.caller;
        },

        /**
         * Adds a listener
         *
         * @api public
         */

        on: function (name, fn, caller) {
            var listener = this.__createListener(fn, caller);
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

        once: function (name, fn, caller) {
            var self = this;
            var listener = this.__createListener(fn, caller);

            function on () {
                self.removeListener(name, on);
                fn.apply(listener.caller, arguments);
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

        removeListener: function (name, fn, caller) {
            var listener = this.__createListener(fn, caller);
            if (this._events && this._events[name]) {
                var list = this._events[name];

                if (Array.isArray(list)) {
                    var pos = -1;

                    for (var i = 0, l = list.length; i < l; i++) {
                        var o = list[i];
                        if (this.__equalsListener(o, listener) || (o.listener && this.__equalsListener(o.listener, listener))) {
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
                } else if (this.__equalsListener(list, listener) || (list.listener && this.__equalsListener(list.listener, listener))) {
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

        removeAllListeners: function (name) {
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

        listeners: function (name) {
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
         * @api public
         */

        emit: function (name) {
            var handler = this._events[name];

            if (!handler) {
                return false;
            }

            var args = Array.prototype.slice.call(arguments, 1);

            if(typeof handler === 'object' && !Array.isArray(handler)){
                handler.fn.apply(handler.caller || this, args);
            } else if (Array.isArray(handler)) {
                var listeners = handler.slice();

                for (var i = 0, l = listeners.length; i < l; i++) {
                    var h = listeners[i];
                    if(h.fn.apply(h.caller || this, args) === false) break;
                }
            } else {
                return false;
            }

            return true;
        }
    });

    jm.eventEmitter = function(){ return new jm.EventEmitter();}

    var prototype = jm.EventEmitter.prototype;
    var EventEmitter = {
        _events: {},

        __createListener: prototype.__createListener,
        __equalsListener: prototype.__equalsListener,
        on: prototype.on,
        once: prototype.once,
        addListener: prototype.on,
        removeListener: prototype.removeListener,
        removeAllListeners: prototype.removeAllListeners,
        listeners: prototype.listeners,
        emit: prototype.emit
    };

    var em = EventEmitter;
    jm.enableEvent = function(obj) {
        if(obj._events!==undefined) return;
        for(var key in em){
            obj[key] = em[key];
        }
        obj._events = {};
    };

    jm.disableEvent = function(obj) {
        for(var key in em){
            delete obj[key];
        }
    };

})();