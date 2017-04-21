let utils = {
    // 高效slice
    slice: (a, start, end) => {
        start = start || 0;
        end = end || a.length;
        if (start < 0) start += a.length;
        if (end < 0) end += a.length;
        let r = new Array(end - start);
        for (let i = start; i < end; i++) {
            r[i - start] = a[i];
        }
        return r;
    },

    formatJSON: (obj) => {
        return JSON.stringify(obj, null, 2);
    },
};

 let module = ($, name = 'utils') => {
    $[name] = utils;

    return {
        name: name,
        unuse: function ($) {
            delete $[name];
        },
    };
};

export default utils;
export {utils, module};
