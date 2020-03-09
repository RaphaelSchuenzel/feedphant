'use strict';

import bcrypt   from 'bcrypt';
import jwt      from 'jsonwebtoken';

// models
import user     from './user'
import secrets  from './secrets'

const model = {
    createAccountEmail: async (credentials) => {
        return await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email = '${credentials.email}'`, function (error, results, fields) {
                if (error || (results && results != null && results.length > 0)) {
                    if (error) {
                        return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, error));
                    } else if (results[0].email === credentials.email) {
                        return reject(new ApplicationError(ErrorCodes.BAD_REQUEST, "Email address is already in use."));
                    } else {
                        return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, null));
                    }
                } else {
                    bcrypt.hash(credentials.password, 12, function(err, hash) {
                        if (err) {
                            return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, error));
                        } else {
                            credentials.password = hash;

                            db.query(`INSERT INTO users (username, email) VALUES ('${credentials.username}', '${credentials.email}')`, function (error, results, fields) {
                                if (error) {
                                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, error));
                                } else if (results) {
                                    user.getUser('email', credentials.email)
                                        .then(function (user) {
                                            db.query(`INSERT INTO users_auth_password (user_id, hash) VALUES ('${user.id}', '${credentials.password}')`, function (error, results, fields) {
                                                if (error) {
                                                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, error));
                                                } else if (results) {
                                                    model.generateAccessToken(user)
                                                        .then(function (response) {
                                                            return resolve(response);
                                                        })
                                                        .catch(function (err) {
                                                            return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
                                                        });
                                                } else {
                                                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, null));
                                                }
                                            });
                                        })
                                        .catch(function (err) {
                                            return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
                                        });
                                } else {
                                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, null));
                                }
                            });
                        }
                    });
                }
            });
        });
    },
    generateAccessToken: async (user) => {
        return await new Promise((resolve, reject) => {
            secrets.getSecret('auth')
                .then(function (secret) {
                    jwt.sign({
                        id: user.id,
                        expiresIn: '14 days'
                    }, secret, function(err, token) {
                        if (err) reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
        
                        resolve(token);
                    });
                })
                .catch(function (err) {
                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
                });
        });
    }
};

export default model;