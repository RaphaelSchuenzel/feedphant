import http from 'http';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import consola from 'consola';
import initializeDb from './db';
import middleware from './middleware';
import routes from './routes';
import config from './config.json';

global.config = config;

// lib
import util 	from './lib/util';
import error 	from './lib/error';
import passport from './lib/passport';

let app = express();

// stay safe
app.use(helmet());

// logger
app.use(morgan(config.debug ? 'dev' : 'tiny'));

// border check
passport({ app, config });

// handle uncaught exceptions
process.on('uncaughtException', (err) => {
    consola.error(err)

    // mandatory (as per the Node docs)
    process.exit(1)
});

// connect to db
initializeDb(db => {
    // internal middleware
    app.use(middleware({ app, config }));

    // api router
    app.use('/api', routes({ app, config }));
});

export default app;
