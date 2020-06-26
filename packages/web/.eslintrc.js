const nodeEnv = require('../helpers/enviroment');

module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "extends": [
        "@nuxtjs",
        "plugin:nuxt/recommended"
    ],
    // add your custom rules here
    "rules": {
        "nuxt/no-cjs-in-config": "off",
        "no-console": nodeEnv === "production" ? "error" : "off",
        "no-debugger": nodeEnv === "production" ? "error" : "off",
        "indent": ["error", 4],
        "no-trailing-spaces": ["error", {
            "skipBlankLines": true,
            "ignoreComments": true
        }],
        "vue/script-indent": ["error", 4, { "baseIndent": 1 }],
        "vue/html-indent": ["error", 4, {
            "alignAttributesVertically": false
        }],
        "vue/multiline-html-element-content-newline": ["error", {
            "allowEmptyLines": true
        }],
        "vue/singleline-html-element-content-newline": "off",
        "no-tabs": "off",
        "semi": "off",
        "eol-last": "off"
    },
    "plugins": [
        "pug"
    ],
    "overrides": [
        {
            "files": ["*.vue"],
            "rules": {
                "indent": "off"
            }
        }
    ]  
}
