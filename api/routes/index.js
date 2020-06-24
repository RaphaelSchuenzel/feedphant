'use strict';

const router = require('express').Router();
const render = require('../lib/render');

router.use('/hub', require('./hub')({ render }))
router.use('/boards', require('./boards')({ render }))
router.use('/auth', require('./auth')({ render }))
router.use('/users', require('./users')({ render }))

module.exports = router;