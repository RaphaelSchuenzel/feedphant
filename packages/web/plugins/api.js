'use strict';

const config = require('../../config');

export default function ({ $axios, store }, inject) {
    const api = $axios.create({
        headers: {
            common: {
                Accept: 'application/json'
            }
        }
    });

    api.setBaseURL(`http://${config.api.host}:${config.api.port}` + '/api');

    // Inject to context as $api
    inject('api', api)
}