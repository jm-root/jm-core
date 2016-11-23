var jm = jm || {};
if (typeof module !== 'undefined' && module.exports) {
    jm = require('./root.js');
}

(function(){
    if(jm.EventEmitter) return;
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

            function on (arg1, arg2, arg3, arg4, arg5) {
                self.removeListener(name, on);
                fn.call(listener.caller, arg1, arg2, arg3, arg4, arg5);
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
         * tip: use arg1...arg5 instead of arguments for performance consider.
         *
         * @api public
         */

        emit: function (name, arg1, arg2, arg3, arg4, arg5) {
            var handler = this._events[name];
            if (!handler) return this;

            if(typeof handler === 'object' && !Array.isArray(handler)){
                handler.fn.call(handler.caller || this, arg1, arg2, arg3, arg4, arg5);
            } else if (Array.isArray(handler)) {
                var listeners = new Array(handler.length);
                for (var i = 0; i < handler.length; i++) {
                    listeners[i] = handler[i];
                }

                for (var i = 0, l = listeners.length; i < l; i++) {
                    var h = listeners[i];
                    if(h.fn.call(h.caller || this, arg1, arg2, arg3, arg4, arg5) === false) break;
                }
            }
            return this;
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
        return this;
    };

    jm.disableEvent = function(obj) {
        for(var key in em){
            delete obj[key];
        }
        return this;
    };

})();
