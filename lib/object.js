var jm = jm || {};
if (typeof module !== 'undefined' && module.exports) {
    jm = require('./root.js');
}

(function(){
    if(jm.Object) return;
    jm.Object = jm.Class.extend({
        _className: 'object',

        attr: function (attrs) {
            for (var key in attrs) {
                if(key === 'className'){
                    continue;
                }

                this[key] = attrs[key];
            }
        }
    });

    jm.object = function(){
        return new jm.Object();
    };
})();
