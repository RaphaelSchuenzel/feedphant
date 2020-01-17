'use strict';

import moment from 'moment';

export default function (payload, inject) {
    // todo: sync moment epoch

    // Inject to context as $moment
    inject('moment', moment)
}