const { Router } = require('express');

module.exports = ({ app, config }) => {
    require('./cors')({ app, config });
    require('./bodyParser')({ app, config });

    return Router();
}
