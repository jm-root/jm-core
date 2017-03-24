export default jm => {
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
};
