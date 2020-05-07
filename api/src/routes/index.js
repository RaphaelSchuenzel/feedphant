'use strict';

const { Router } = require('express');
const { version } = require('../../package.json');

module.exports = ({ db, passport }) => {
    const api = Router();

    const routes = {
        hub: require('./hub')({ api, db, passport }),
        boards: require('./boards')({ api, db, passport }),
        auth: require('./auth')({ api, db, passport }),
        users: require('./users')({ api, db, passport })
    }

    return api;
}