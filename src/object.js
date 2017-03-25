export default (jm, name = 'object') => {
    jm.Object = jm.Class.extend({
        _className: 'object',

        attr: function (attrs) {
            for (let key in attrs) {
                if(key === 'className'){
                    continue;
                }

                this[key] = attrs[key];
            }
        },
    });

    jm.object = function(){
        return new jm.Object();
    };

    return {
        name: name,
        unuse: function (jm) {
            delete jm.Object;
            delete jm.object;
        }
    };
};
