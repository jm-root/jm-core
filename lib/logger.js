var jm = jm || {};
if (typeof module !== 'undefined' && module.exports) {
    jm = require('./root.js');
}

(function(){
    if (typeof module !== 'undefined' && module.exports) {
        var log4js = require('log4js');
        jm.getLogger = function(loggerCategoryName) {
            return log4js.getLogger(loggerCategoryName);
        };
    }else{
        jm.getLogger = function(loggerCategoryName) {
            console.debug = console.debug || console.log;
            return console;
        };
    }
    jm.logger = jm.getLogger();
})();
