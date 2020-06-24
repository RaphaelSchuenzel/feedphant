'use strict';

const hub = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

// controllers
const HubController = require('../../controllers/hub');

module.exports = ({ render }) => {
    hub.route('/')
        .get(celebrate({
            [Segments.HEADERS]: Joi.object().keys({
                host: Joi.string().uri().required()
            })
        }), render(HubController.getHub))

        .post(celebrate({
            [Segments.BODY]: Joi.object().keys({
                subdomain: Joi.string().required(),
                productName: Joi.string().required(),
                userName: Joi.string().required(),
                userEmail: Joi.string().email().required(),
                userPassword: Joi.string()
            })
        }), render(HubController.createHub))
        
        .put(render(HubController.updateHub));

    return hub;
};