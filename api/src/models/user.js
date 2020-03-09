'use strict';

const model = {
    getUser: async function (condition, value) {
        return await new Promise((resolve, reject) => {
            if (condition && value) {

                // allow lookup for unique conditions only
                if (condition === 'id' || condition === 'email') {
                    db.query(`SELECT * FROM users WHERE ${condition} = '${value}'`, function (error, results, fields) {
                        if (error) {
                            reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, error));
                        } else if (results) {
                            let response = {};
                            
                            response.id         = results[0].id;
                            response.username   = results[0].username;
                            response.avatar     = results[0].avatar_url;
                            
                            return resolve(response);
                        } else {
                            return resolve({});
                        }
                    });
                } else {
                    reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, "Invalid condition."));
                }
            } else {
                reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, "Missing arguments."));
            }
        });
    }
};

export default model;