var jm = jm || {};
if (typeof module !== 'undefined' && module.exports) {
    module.exports = jm;
}

(function(){
    if(jm.root) return;
    var root = {};
    var registries = {};
    root.registries = registries;
    jm.root = root;

})();
