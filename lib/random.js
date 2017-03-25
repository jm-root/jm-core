'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var iRandomMax = 200000000000; // 最大随机整数范围 0 <= randomValue <= iRandomMax;

exports.default = function (jm) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'random';

    jm.Random = jm.Class.extend({
        _className: 'random',

        properties: {
            seed: { get: 'getSeed', set: 'setSeed' }
        },

        ctor: function ctor(opts) {
            opts = opts || {};
            this.g_seed = 0;
            this.randomMax = opts.randomMax || iRandomMax;
        },

        setSeed: function setSeed(seed) {
            this.g_seed = seed;
        },

        getSeed: function getSeed() {
            return this.g_seed;
        },

        random: function random() {
            this.g_seed = (this.g_seed * 9301 + 49297) % 233280;
            return this.g_seed / 233280.0;
        },

        // min<=result<=max
        randomInt: function randomInt(min, max) {
            if (max === undefined) {
                max = min;
                min = 0;
            }
            var range = min + this.random() * (max - min);
            return Math.round(range);
        },

        // min<=result<=max
        randomDouble: function randomDouble(min, max) {
            if (max === undefined) {
                max = min;
                min = 0.0;
            }

            var range = min + this.random() * (max - min);
            return range;
        },

        randomRange: function randomRange(range) {
            return this.randomInt(0, this.randomMax) % range;
        },

        randomOdds: function randomOdds(range, odds) {
            if (this.randomRange(range) < odds) return 1;
            return 0;
        }
    });

    jm.random = function (opts) {
        return new jm.Random(opts);
    };

    return {
        name: name,
        unuse: function unuse(jm) {
            delete jm.Random;
            delete jm.random;
        }
    };
};

module.exports = exports['default'];