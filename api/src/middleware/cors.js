'use strict';

const cors = require('cors');

module.exports = ({ app, config }) => {
    app.use(cors({
        exposedHeaders: config.corsHeaders
    }));
}