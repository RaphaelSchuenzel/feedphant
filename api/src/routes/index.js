'use strict';

const { version } = require('../../package.json');
const { Router } = require('express');

module.exports = ({ app, config, db, passport }) => {
    const api = Router();

    api.get('/', (req, res) => {
        res.json({ version });
    });

    const routes = {
        auth    : require('./auth')({ api, db, passport }),
        boards  : require('./boards')({ api, db, passport }),
        users   : require('./users')({ api, db, passport })
    }

    return api;
}