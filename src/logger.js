var getLogger = loggerCategoryName => {
    console.debug = console.debug || console.log;
    return console;
};

export default jm => {
    jm.getLogger = getLogger;
    jm.logger = getLogger();
};
