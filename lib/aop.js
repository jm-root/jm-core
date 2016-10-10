var jm = jm || {};
if (typeof module !== 'undefined' && module.exports) {
    jm = require('./root.js');
}

(function(){
    jm.aop = {
        _Arguments: function (args) {
            //convert arguments object to array
            this.value = [].slice.call(args);
        },

        arguments: function () {
            //convert arguments object to array
            return new this._Arguments(arguments);
        },

        inject: function( aOrgFunc, aBeforeExec, aAtferExec ) {
            var self = this;
            return function() {
                var Result, isDenied=false, args=[].slice.call(arguments);
                if (typeof(aBeforeExec) == 'function') {
                    Result = aBeforeExec.apply(this, args);
                    if (Result instanceof self._Arguments) //(Result.constructor === _Arguments)
                        args = Result.value;
                    else if (isDenied = Result !== undefined)
                        args.push(Result);
                }
                !isDenied && args.push(aOrgFunc.apply(this, args)); //if (!isDenied) args.push(aOrgFunc.apply(this, args));
                if (typeof(aAtferExec) == 'function')
                    Result = aAtferExec.apply(this, args.concat(isDenied));
                else
                    Result = undefined;
                return (Result !== undefined ? Result : args.pop());
            }
        }
    };

})();