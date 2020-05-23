'use strict';

const hub = require('express').Router();

// controllers
const HubController = require('../../controllers/hub');

hub.route('/')
    .get(HubController.getHub)
    .post(HubController.createHub)
    .put(HubController.updateHub);

module.exports = hub;