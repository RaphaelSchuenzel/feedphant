'use strict';

// controllers
import AuthController from '../../controllers/auth'

const requests = () => {
    post: {
        api.post('/auth/email', AuthController.registerAccountEmail);
    }
    put: {
        api.put('/auth/email', passport.authenticate('local'), AuthController.loginAccountEmail);
    }
}

export default requests;