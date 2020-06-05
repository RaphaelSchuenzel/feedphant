const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const consola = require('consola');
const config = require('../config/config.json');
const routes = require('./routes');

const app = express();

if (config.api.debug) {
    consola.warn('API is running with debugging tools activated. For use in production, make sure to disable the debug option within the API config.');
}

// lib
const error = require('./lib/error');
require('./lib/passport')({ app });

// stay safe
app.use(helmet());

// logger
app.use(morgan(config.api.debug ? 'dev' : 'tiny'));

// internal middleware
require('./middleware/cors')({ app, config });
require('./middleware/bodyParser')({ app, config });

// api router
app.use('/api', routes);

module.exports = app;
