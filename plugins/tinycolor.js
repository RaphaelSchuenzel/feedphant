'use strict';

import tinycolor from 'tinycolor2';

export default function (payload, inject) {
    // Inject to context as $tinycolor
    inject('tinycolor', tinycolor)
}