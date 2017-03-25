export default (jm, name = 'event') => {
    jm.EventEmitter = jm.Object.extend({
        _className: 'eventEmitter',

        ctor: function () {
            this._events = {};
            this.addListener = this.on;
        },

        __createListener: function (fn, caller) {
            caller = caller;
            return {
                fn: fn,
                caller: caller,
            };
        },

        __equalsListener: function (l1, l2) {
            return l1.fn === l2.fn && l1.caller === l2.caller;
        },

        /**
         * Adds a listener
         *
         * @api public
         */

        on: function (name, fn, caller) {
            let listener = this.__createListener(fn, caller);
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
            let listener = this.__createListener(fn, caller);

            var on = (arg1, arg2, arg3, arg4, arg5) => {
                this.removeListener(name, on);
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
            let listener = this.__createListener(fn, caller);
            if (this._events && this._events[name]) {
                let list = this._events[name];

                if (Array.isArray(list)) {
                    let pos = -1;

                    for (let i = 0, l = list.length; i < l; i++) {
                        let o = list[i];
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
            let handler = this._events[name];
            if (!handler) return this;

            if (typeof handler === 'object' && !Array.isArray(handler)) {
                handler.fn.call(handler.caller || this, arg1, arg2, arg3, arg4, arg5);
            } else if (Array.isArray(handler)) {
                let listeners = new Array(handler.length);
                for (let i = 0; i < handler.length; i++) {
                    listeners[i] = handler[i];
                }

                for (let i = 0, l = listeners.length; i < l; i++) {
                    let h = listeners[i];
                    if (h.fn.call(h.caller || this, arg1, arg2, arg3, arg4, arg5) === false) break;
                }
            }
            return this;
        }
    });

    jm.eventEmitter = function () {
        return new jm.EventEmitter();
    }

    let prototype = jm.EventEmitter.prototype;
    let EventEmitter = {
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

    let em = EventEmitter;
    jm.enableEvent = function (obj) {
        if (obj._events !== undefined) return;
        for (let key in em) {
            obj[key] = em[key];
        }
        obj._events = {};
        return this;
    };

    jm.disableEvent = function (obj) {
        for (let key in em) {
            delete obj[key];
        }
        return this;
    };

    return {
        name: name,
        unuse: function (jm) {
            delete jm.EventEmitter;
            delete jm.eventEmitter;
            delete jm.enableEvent;
            delete jm.disableEvent;
        }
    };
}