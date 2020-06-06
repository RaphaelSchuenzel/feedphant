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
            userName: Joi.string().required(),
            userEmail: Joi.string().email().required(),
            userPassword: Joi.string()
        })
    }), HubController.createHub)
    .put(HubController.updateHub);

module.exports = hub;