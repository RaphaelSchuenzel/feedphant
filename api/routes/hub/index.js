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
            subdomain: Joi.string().required(),
            productName: Joi.string().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string()
        })
    }), HubController.createHub)
    .put(HubController.updateHub);

module.exports = hub;