var jm = jm || {};
if (typeof module !== 'undefined' && module.exports) {
    jm = require('./root.js');
}

(function(){
    var iRandomMax = 200000000000;    //最大随机整数范围 0 <= randomValue <= iRandomMax;

    jm.Random = jm.Class.extend({
        _className: 'random',

        properties: {
            seed: { get: 'getSeed', set: 'setSeed' }
        },

        ctor: function(opts){
            opts = opts || {};
            this.g_seed = 0;
            this.randomMax =  opts.randomMax || iRandomMax;            
        },

        setSeed : function(seed)
        {
            this.g_seed = seed;
        },

        getSeed : function()
        {
            return this.g_seed;
        },

        random : function(){
            this.g_seed = ( this.g_seed * 9301 + 49297 ) % 233280;
            return this.g_seed / ( 233280.0 );
        },

        //min<=result<=max
        randomInt : function(min, max)
        {
            if(max === undefined) {
                max = min;
                min = 0;
            }
            var range = min + (this.random()*(max - min));
            return Math.round(range);
        },

        //min<=result<=max
        randomDouble : function(min, max)
        {
            if(max === undefined) {
                max = min;
                min = 0.0;
            }

            var range = min + (this.random()*(max - min));
            return range;
        },

        randomRange : function(range){
            return this.randomInt(0,this.randomMax) % range;
        },

        randomOdds : function(range, odds){
            if(this.randomRange(range) < odds) return 1;
            return 0;
        }
    });

    jm.random = function(opts){
        return new jm.Random(opts);
    };

})();

