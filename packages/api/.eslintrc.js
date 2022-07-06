module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "parser": "babel-eslint"
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4],
        "no-trailing-spaces": ["error", {
            "skipBlankLines": true,
            "ignoreComments": true
        }],
        "no-tabs": "off",
        "semi": "off",
        "eol-last": "off"
    }
};