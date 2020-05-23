'use strict';

const fs = require('fs');
const crypto = require('crypto');

module.exports = ({ api, db, passport }) => ({
    getSecret: (type) => {
        // cache

        return new Promise((resolve, reject) => {
            let prefix = './secrets/';
            
            fs.readFile(prefix + type + '.json', (err, data) => {
                if (err) {
                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
                } else if (data) {
                    const response = JSON.parse(data)
                    
                    if (response && response.secret) {
                        resolve(response.secret);
                    } else {
                        module.exports.generateSecret('auth')
                            .then(function (data) {
                                const response = JSON.parse(data);

                                resolve(response.secret);
                            })
                            .catch(function (err) {
                                return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
                            });
                    }
                }
            });
        });
    },
    generateSecret: (type) => {
        return new Promise((resolve, reject) => {
            const prefix = './secrets/';
            const secret = crypto.randomBytes(256).toString('hex');
            
            const expires = new Date();
            expires.setDate(expires.getDate() + 14);

            const data = JSON.stringify({
                secret,
                expires
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