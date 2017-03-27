let _use = function ($, fn, name) {
    let m = fn($, name);
    if (m && m.name) {
        $.modules[m.name] = m;
    }
    return m;
};

export default ($) => {
    $.modules = {};
    $.use = function (pathOrFn, name) {
        let fn = pathOrFn;
        if (typeof fn === 'string') {
        } else if (typeof fn === 'function') {
            _use(this, fn, name);
        }
        return this;
    };
    $.unuse = function (nameOrModule) {
        let m = nameOrModule;
        if (typeof m === 'string') m = this.modules[m];
        if (m && m.unuse) {
            if (m.name) {
                delete this.modules[m.name];
            }
            m.unuse(this);
        }
        return this;
    };

    return {
        name: 'root',
    };
};
