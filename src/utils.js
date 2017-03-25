export default (jm, name = 'utils') => {
    jm[name] = {
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

    return {
        name: name,
        unuse: function (jm) {
            delete jm[name];
        }
    };
};
