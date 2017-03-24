var getLogger = loggerCategoryName => {
    console.debug = console.debug || console.log;
    return console;
};

var logger = getLogger();

export default jm => {
    jm.getLogger = getLogger;
    jm.logger = logger;
};
