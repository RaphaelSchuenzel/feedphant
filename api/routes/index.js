'use strict';

const router = require('express').Router();
const render = require('../middleware/render');

router.use('/hub', require('./hub')({ render }))
router.use('/boards', require('./boards'))
router.use('/auth', require('./auth'))
router.use('/users', require('./users'))

module.exports = router;