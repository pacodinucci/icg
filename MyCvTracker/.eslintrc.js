module.exports = {
    "extends": ["eslint:recommended", "angular"],
    "env": {
        "browser": true,
        "node": true,
        "jquery": true
    },
    "plugins": ["compat"],
    "rules": {
        "angular/no-service-method": 0,
        "angular/no-http-callback": "error",
        "angular/no-directive-replace": "error",
        "angular/no-cookiestore":  "error",
        "no-use-before-define": ["error", { "functions": false }],
        "compat/compat": "error"
    },
    "globals": {
        "angular": true,
    }
};