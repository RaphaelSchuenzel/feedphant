'use strict';

const router = require('express').Router();

module.exports = () => {
    router.use('/hub', require('./hub'))
    router.use('/boards', require('./boards'))
    router.use('/auth', require('./auth'))
    router.use('/users', require('./users'))
}