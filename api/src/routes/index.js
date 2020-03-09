'use strict';

import { version }  from '../../package.json';
import { Router }   from 'express';

// routes
import auth             from './auth'
import hubs             from './hubs'
import organizations    from './organizations'
import users            from './users'

export default ({ app, config }) => {
    global.api = Router();

    let maintenance = false;

    api.get('/', (req, res) => {
        res.json({ version, "maintenance": maintenance });
    });

    auth();
    hubs();
    organizations();
    users();

    return api;
}