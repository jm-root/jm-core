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