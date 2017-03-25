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
            for (var key in properties) {
                var desc = properties[key];
                if (desc.get && typeof desc.get == 'string') {
                    desc.get = prototype[desc.get];
                }
                if (desc.set && typeof desc.set == 'string') {
                    desc.set = prototype[desc.set];
                }
                Object.defineProperty(prototype, key, desc);
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