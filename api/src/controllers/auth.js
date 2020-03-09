'use strict';

import EmailValidator from 'email-validator';

// models
import auth from '../models/auth'

export default {
    registerAccountEmail: async function (req, res, next) {
        try {
            if (req.body.email != null && req.body.username != null && req.body.password != null) {
                if (req.body.username.length < 2 || req.body.username.length > 40) {
                    throw new ApplicationError(ErrorCodes.BAD_REQUEST, "Invalid Username. (Minimum 2, Maximum 40 Characters)");
                } else if (EmailValidator.validate(req.body.email) !== true) {
                    throw new ApplicationError(ErrorCodes.BAD_REQUEST, "Invalid Email Address.");
                } else if (req.body.password.length < 8) {
                    throw new ApplicationError(ErrorCodes.BAD_REQUEST, "Invalid Password. (Minimum 8 Characters)");
                }

                let user = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                };

                auth.createAccountEmail(user)
                    .then(function (response) {
                        return res.json(response);
                    })
                    .catch(function (err) {
                        return res.status(err.status).json(err);
                    });
            } else {
                throw new ApplicationError(ErrorCodes.BAD_REQUEST, "Invalid Payload.");
            }
        } catch (err) {
            return res.status(err.status).json(err);
        }
    },
    loginAccountEmail: async function (req, res, next) {
        try {
            let user = req.user;

            if (user) {
                auth.generateAccessToken(user)
                    .then(function (response) {
                        return res.json(response);
                    })
                    .catch(function (err) {
                        return res.status(err.status).json(err);
                    });
            } else {
                throw new ApplicationError(ErrorCodes.INTERNAL_ERROR, error);
            }
        } catch (err) {
            return res.status(err.status).json(err);
        }
    }
}