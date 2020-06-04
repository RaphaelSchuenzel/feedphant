'use strict';

const hub = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

// controllers
const HubController = require('../../controllers/hub');

hub.route('/')
    .get(celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            host: Joi.string().uri().required()
        })
    }), HubController.getHub)
    .post(celebrate({
        [Segments.BODY]: Joi.object().keys({
            productName: Joi.string().required(),
            contactName: Joi.string().required(),
            contactEmail: Joi.string().email().required()
        })
    }), HubController.createHub)
    .put(HubController.updateHub);

module.exports = hub;