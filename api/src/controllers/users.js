'use strict';

module.exports = ({ api, db, passport }) => ({
    getUser: (condition, value) => {
        return new Promise((resolve, reject) => {
            if (condition && value) {
                // allow lookup for unique conditions only

                if (condition === 'id' || condition === 'email') {
                    /* db.query(`SELECT * FROM users WHERE ${condition} = '${value}'`, function (error, results, fields) {
                        if (error) {
                            reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, error));
                        } else if (results) {
                            const response = {};
                            
                            response.id = results[0].id;
                            response.username = results[0].username;
                            response.avatar = results[0].avatar_url;
                            
                            return resolve(response);
                        } else {
                            return resolve({});
                        }
                    }); */
                } else {
                    reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, 'Invalid condition.'));
                }
            } else {
                reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, 'Missing arguments.'));
            }
        });
    },
    getUsersMe: (req, res, next) => {
        try {
            return res.json(req.user);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    }
});