'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (jm) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'object';

    jm.Object = jm.Class.extend({
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

    jm.object = function () {
        return new jm.Object();
    };

    return {
        name: name,
        unuse: function unuse(jm) {
            delete jm.Object;
            delete jm.object;
        }
    };
};

module.exports = exports['default'];