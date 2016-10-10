var jm = jm || {};
if (typeof module !== 'undefined' && module.exports) {
    jm = require('../');
}

(function(){
    console.info('******** jm.Object *********');
    console.info(jm.Object.prototype);
    console.info(jm.object());
})();

