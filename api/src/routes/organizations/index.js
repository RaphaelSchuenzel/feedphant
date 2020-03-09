'use strict';

const requests = () => {
    get: {
        api.get('/organizations', async (req, res) => {
            try {
                let authenticated = false;
        
                if (authenticated) {
                    res.send("authenticated");
                } else {
                    throw new ApplicationError(ErrorCodes.UNAUTHORIZED);
                }
            } catch (err) {
                return res.status(err.status).json(err);
            }
        });
    }
}

export default requests;