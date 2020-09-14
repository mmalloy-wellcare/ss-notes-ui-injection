'use strict';

module.exports = (app) => {

    // add application/json header to all responses
    app.use((request, response, next) => {
        response.header('Content-Type', 'application/json');
        next();
    });

    app.use('/shared-services/ss-notes/v1', require('./ss-notes'));

    // catch all errors block
    app.use((error, request, response, next) => {
        if (response.headerSent) {
            return next(error);
        }

        response.status(error.status || 500);
        let errorMessage = error.message || error;

        if (typeof errorMessage === 'string' && errorMessage.startsWith('errors.')) {
            errorMessage = response.__t(errorMessage);
        }

        response.send({
            code: error.code || error.status || 9999,
            message: errorMessage,
            stack: error.stack
        });
    });
}