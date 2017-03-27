'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var iRandomMax = 200000000000; // 最大随机整数范围 0 <= randomValue <= iRandomMax;

/**
 * create new Random
 * @class
 */

var $$ = function () {

    /**
     * constructor
     * @param {Object} [opts]
     */
    function $$() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, $$);

        this.seed = opts.seed || Date.now();
        this.randomMax = opts.randomMax || iRandomMax;
    }

    /**
     *
     * @return {number}
     */


    _createClass($$, [{
        key: 'random',
        value: function random() {
            this.seed = (this.seed * 9301 + 49297) % 233280;
            return this.seed / 233280.0;
        }

        /**
         * min<=result<=max
         * @param {number} min
         * @param {number} max
         * @return {number}
         */

    }, {
        key: 'randomInt',
        value: function randomInt(min, max) {
            if (max === undefined) {
                max = min;
                min = 0;
            }
            var range = min + this.random() * (max - min);
            return Math.round(range);
        }

        /**
         * min<=result<=max
         * @param {number} min
         * @param {number} max
         * @return {number}
         */

    }, {
        key: 'randomDouble',
        value: function randomDouble(min, max) {
            if (max === undefined) {
                max = min;
                min = 0.0;
            }

            var range = min + this.random() * (max - min);
            return range;
        }

        /**
         *
         * @param {number} range
         * @return {number}
         */

    }, {
        key: 'randomRange',
        value: function randomRange(range) {
            return this.randomInt(0, this.randomMax) % range;
        }

        /**
         *
         * @param {number} range
         * @param {number} odds
         * @return {number}
         */

    }, {
        key: 'randomOdds',
        value: function randomOdds(range, odds) {
            if (this.randomRange(range) < odds) return 1;
            return 0;
        }
    }]);

    return $$;
}();

var _module = function _module($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'random';

    $.random = function (opts) {
        return new $$(opts);
    };

    return {
        name: name,
        unuse: function unuse($) {
            delete $.random;
        }
    };
};

exports.default = $$;
exports.Random = $$;
exports.module = _module;