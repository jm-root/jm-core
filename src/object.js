export default ($, name = 'object') => {
    $.Object = $.Class.extend({
        _className: 'object',

        attr: function (attrs) {
            for (let key in attrs) {
                if (key === 'className') {
                    continue;
                }

                this[key] = attrs[key];
            }
        },
    });

    $.object = function () {
        return new $.Object();
    };

    return {
        name: name,
        unuse: function ($) {
            delete $.Object;
            delete $.object;
        },
    };
};
