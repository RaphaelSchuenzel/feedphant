'use strict';

import cors from 'cors';

export default ({ app, config }) => {
    app.use(cors({
        exposedHeaders: config.corsHeaders
    }));
}