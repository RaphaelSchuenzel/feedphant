const { Router } = require('express');

module.exports = ({ app, config }) => {
    const middleware = {
        cors        : require('./cors')({ app, config }),
        bodyParser  : require('./bodyParser')({ app, config }),
    }

    return Router();
}
