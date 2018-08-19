module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "no-console": 'off',
      "no-path-concat":'off',
    //     "indent": [
    //         "error",
    //         "tab"
    //     ],
    //     "linebreak-style": [
    //         "error",
    //         "windows"
    //     ],
    //     "quotes": [
    //         "error",
    //         "double"
    //     ],
    //     "semi": [
    //         "error",
    //         "always"
    //     ]
    }
};
