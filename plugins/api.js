'use strict';

import enviroment from '../helpers/enviroment.js';

export default function ({ $axios, store }, inject) {
    const api = $axios.create({
        headers: {
            common: {
                Accept: 'application/json'
            }
        }
    });

    api.setBaseURL(store.state.system.api_url[enviroment]);

    // Inject to context as $api
    inject('api', api)
}