const ErrorCodes = {
    "INTERNAL_ERROR": {
        id: 'INTERNAL_ERROR',
        message: 'An internal error occured.',
        status: 500
    },
    "BAD_REQUEST": {
        id: 'BAD_REQUEST',
        message: 'The server was unable to process the request.',
        status: 400
    },
    "UNAUTHORIZED": {
        id: 'UNAUTHORIZED',
        message: 'You are not authorized to do this.',
        status: 401
    },
    "NOT_FOUND": {
        id: 'NOT_FOUND',
        message: 'The resource could not be found.',
        status: 404
    }
}

class ApplicationError extends Error {
    constructor(code, error) {
        code = code || ErrorCodes.INTERNAL_ERROR;

        super(code);

        let response = {}

        response.status     = code.status;
        response.code       = code.id;
        response.title      = code.message;
        
        // log this
        if (error && error != null) {
            response.detail = error.toString();
        }

        return response;
    }
}

global.ErrorCodes = ErrorCodes;
global.ApplicationError = ApplicationError;

module.exports = { ErrorCodes, ApplicationError }