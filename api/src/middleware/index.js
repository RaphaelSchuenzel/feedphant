import { Router }   from 'express';

import cors 		from './cors'
import bodyParser 	from './bodyParser'

export default ({ app, config }) => {
    cors({ app, config })
    bodyParser({ app, config })

    return Router();
}
