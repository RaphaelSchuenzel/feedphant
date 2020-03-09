'use strict';

export default function ({ $axios, store }, inject) {
    const api = $axios.create({
        headers: {
            common: {
                Accept: 'application/json'
            }
        }
    });

    api.setBaseURL(`http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}` + '/api');

    // Inject to context as $api
    inject('api', api)
}