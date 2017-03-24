export default jm => {
    jm.utils = {
        //高效slice
        slice: function (a, start, end) {
            start = start || 0;
            end = end || a.length;
            if (start < 0) start += a.length;
            if (end < 0) end += a.length;
            var r = new Array(end - start);
            for (var i = start; i < end; i++) {
                r[i - start] = a[i];
            }
            return r;
        },

        formatJSON: function(obj){
            return JSON.stringify(obj, null, 2);
        }
    };
};
