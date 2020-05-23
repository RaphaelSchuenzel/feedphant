const { Router } = require('express');

module.exports = ({ app, config }) => {
    const cors = require('./cors')({ app, config });
    const bodyParser = require('./bodyParser')({ app, config });

    return Router();
}
