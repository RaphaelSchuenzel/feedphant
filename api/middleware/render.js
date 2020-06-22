const logger = require('../lib/logger');

module.exports = (controller) => {
    return async (req, res, next) => {
        try {
            return res.json(await controller(req))
        } catch (err) {
            // todo: handle error
            logger.error(err);

            return res.status(err.status || 500).json(err || {});
        }
    }
}