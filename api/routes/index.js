'use strict';

const router = require('express').Router();

router.use('/hub', require('./hub'))
router.use('/boards', require('./boards'))
router.use('/auth', require('./auth'))
router.use('/users', require('./users'))

module.exports = router;