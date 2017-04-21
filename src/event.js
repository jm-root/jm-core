let __createListener = (fn, caller) => {
    return {
        fn: fn,
        caller: caller || null,
    };
};

let __equalsListener = (l1, l2) => {
    return l1.fn === l2.fn && l1.caller === l2.caller;
};

/**
 * Creates a new EventEmitter
 *
 * @class
 */
class EventEmitter {

    /**
     * @constructs
     */
    constructor () {
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
    on (name, fn, caller) {
        let listener = __createListener(fn, caller);
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
    once (name, fn, caller) {
        let listener = __createListener(fn, caller);

        let on = (arg1, arg2, arg3, arg4, arg5) => {
            this.removeListener(name, on);
            fn.call(listener.caller || this, arg1, arg2, arg3, arg4, arg5);
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
    removeListener (name, fn, caller) {
        let listener = __createListener(fn, caller);
        if (this._events && this._events[name]) {
            let list = this._events[name];

            if (Array.isArray(list)) {
                let pos = -1;

                for (let i = 0, l = list.length; i < l; i++) {
                    let o = list[i];
                    if (__equalsListener(o, listener)
                        || (o.listener
                        && __equalsListener(o.listener, listener))
                    ) {
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
            } else if (__equalsListener(list, listener)
                || (list.listener
                && __equalsListener(list.listener, listener))
            ) {
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
    removeAllListeners (name) {
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
    listeners (name) {
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
    emit (name, arg1, arg2, arg3, arg4, arg5) {
        let handler = this._events[name];
        if (!handler) return this;

        if (typeof handler === 'object' && !Array.isArray(handler)) {
            handler.fn.call(handler.caller || this,
                arg1, arg2, arg3, arg4, arg5);
        } else if (Array.isArray(handler)) {
            let listeners = new Array(handler.length);
            for (let i = 0; i < handler.length; i++) {
                listeners[i] = handler[i];
            }

            for (let i = 0, l = listeners.length; i < l; i++) {
                let h = listeners[i];
                if (h.fn.call(h.caller || this,
                        arg1, arg2, arg3, arg4, arg5) === false) break;
            }
        }
        return this;
    }
}

let prototype = EventEmitter.prototype;
let EM = {
    _events: {},
    on: prototype.on,
    once: prototype.once,
    addListener: prototype.on,
    removeListener: prototype.removeListener,
    removeAllListeners: prototype.removeAllListeners,
    listeners: prototype.listeners,
    emit: prototype.emit,
};

let enableEvent = (obj) => {
    if (obj.emit !== undefined) return;
    for (let key of Object.keys(EM)) {
        obj[key] = EM[key];
    }
    obj._events = {};
};

let disableEvent = (obj) => {
    for (let key of Object.keys(EM)) {
        delete obj[key];
    }
};

let module = ($, name = 'event') => {
    $.enableEvent = enableEvent;
    $.disableEvent = disableEvent;

    return {
        name: name,
        unuse: function ($) {
            delete $.enableEvent;
            delete $.disableEvent;
        },
    };
};

export default EventEmitter;
export {EventEmitter, enableEvent, disableEvent, module};
