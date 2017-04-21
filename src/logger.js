let getLogger = (loggerCategoryName) => {
    console.debug || (console.debug = console.log);
    return console;
};

let moduleLogger = ($, name = 'logger') => {
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

export default getLogger;
export {getLogger, moduleLogger};
