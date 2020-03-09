'use strict';

// controllers
import UserController from '../../controllers/users'

const requests = () => {
    get: {
        api.get('/users/me', passport.authenticate('bearer'), UserController.getUsersMe);
    }
}

export default requests;