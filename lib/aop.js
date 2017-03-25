'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (jm) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'aop';

    jm[name] = {
        _Arguments: function _Arguments(args) {
            //convert arguments object to array
            this.value = [].slice.call(args);
        },

        arguments: function _arguments() {
            //convert arguments object to array
            return new this._Arguments(arguments);
        },

        inject: function inject(aOrgFunc, aBeforeExec, aAtferExec) {
            var self = this;
            return function () {
                var Result,
                    isDenied = false,
                    args = [].slice.call(arguments);
                if (typeof aBeforeExec == 'function') {
                    Result = aBeforeExec.apply(this, args);
                    if (Result instanceof self._Arguments) //(Result.constructor === _Arguments)
                        args = Result.value;else if (isDenied = Result !== undefined) args.push(Result);
                }
                !isDenied && args.push(aOrgFunc.apply(this, args)); //if (!isDenied) args.push(aOrgFunc.apply(this, args));
                if (typeof aAtferExec == 'function') Result = aAtferExec.apply(this, args.concat(isDenied));else Result = undefined;
                return Result !== undefined ? Result : args.pop();
            };
        }
    };

    return {
        name: name,
        unuse: function unuse(jm) {
            delete jm[name];
        }
    };
};

module.exports = exports['default'];