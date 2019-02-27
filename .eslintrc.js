module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "class-methods-use-this": "off",
        "no-shadow": [2, {"allow": ["error", "reject", "resolve"]}],
        "func-names": "off",
        "no-await-in-loop": "off",
        "linebreak-style": 0,
        "import/no-cycle": "off"
    },
    "globals": {
        "window": true,
        "CONFIG": true,
    },
}
