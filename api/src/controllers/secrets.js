'use strict';

const fs = require('fs');
const crypto = require('crypto');

module.exports = ({ api, db, passport }) => ({
    getSecret: async function (type) {
        // cache

        return await new Promise((resolve, reject) => {
            let prefix = './secrets/';
            
            fs.readFile(prefix + type + '.json', (err, data) => {
                if (err) {
                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
                } else if (data) {
                    let response = JSON.parse(data)
                    
                    if (response && response.secret) {
                        resolve(response.secret);
                    } else {
                        model.generateSecret('auth')
                            .then(function (data) {
                                let response = JSON.parse(data);

                                if (response && response.secret) {
                                    resolve(response.secret);
                                } else {
                                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, IsStringNull(string)));
                                }
                            })
                            .catch(function (err) {
                                return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
                            });
                    }
                }
            });
        });
    },
    generateSecret: async function (type) {
        return await new Promise((resolve, reject) => {
            let prefix  = './secrets/';
            let secret  = crypto.randomBytes(256).toString('hex');
            
            let expires = new Date();
            expires.setDate(expires.getDate() + 14);

            var data = JSON.stringify({
                secret: secret,
                expires: expires
            });
            
            // todo: create file if it doesnt exist
            fs.writeFile(prefix + type + '.json', data, (err) => {
                if (err) {
                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
                } else if (data) {
                    resolve(data);
                }
            });
        });
    }
});