'use strict';

import moment from 'moment';

export default function (payload, inject) {
    // todo: sync moment epoch

    // Inject to context as $tinycolor
    inject('moment', moment)
}