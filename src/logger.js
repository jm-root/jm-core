let getLogger = (loggerCategoryName) => {
    console.debug || (console.debug = console.log);
    return console;
};

export default (jm, name = 'logger') => {
    jm.getLogger = getLogger;
    jm.logger = getLogger();
    return {
        name: name,
        unuse: function (jm) {
            delete jm.logger;
            delete jm.getLogger;
        }
    };
};
