const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const consola = require('consola');
const config = require('../config/config.json');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

// lib
const error = require('./lib/error');
require('./lib/passport')({ app });

// stay safe
app.use(helmet());

// logger
app.use(morgan(config.api.debug ? 'dev' : 'tiny'));

// handle uncaught exceptions
process.on('uncaughtException', (err) => {
    consola.error(err)

    // mandatory (as per the Node docs)
    process.exit(1)
});

if (config.api.debug) {
    consola.warn('API is running with debugging tools activated. For use in production, make sure to disable the debug option within the API config.');
}

// internal middleware
app.use(middleware({ app, config }));

// api router
app.use('/api', routes);

module.exports = app;
