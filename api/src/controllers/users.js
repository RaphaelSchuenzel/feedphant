'use strict';

export default {
    getUsersMe: async function (req, res, next) {
        try {
            let user = req.user;

            if (user) {
                return res.json(user);
            } else {
                throw new ApplicationError(ErrorCodes.INTERNAL_ERROR, error);
            }
        } catch (err) {
            return res.status(err.status).json(err);
        }
    }
}