let getLogger = (loggerCategoryName) => {
    console.debug || (console.debug = console.log);
    return console;
};

export default ($, name = 'logger') => {
    $.getLogger = getLogger;
    $.logger = getLogger();
    return {
        name: name,
        unuse: function ($) {
            delete $.logger;
            delete $.getLogger;
        },
    };
};
