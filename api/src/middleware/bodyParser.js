'use strict';

import bodyParser from 'body-parser';

export default ({ app, config }) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json({
        limit : config.bodyLimit
    }));

    // handle body parser syntax errors
    app.use(function(err, req, res, next) {
        try {
            if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
                throw new ApplicationError(ErrorCodes.BAD_REQUEST, "Invalid Payload.");
            } else {
                next();
            }
        } catch (err) {
            return res.status(err.status).json(err);
        }
    });
}