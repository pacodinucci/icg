module.exports = {
  "parser" : "@typescript-eslint/parser",
  "env" : {
    "browser" : true,
    "es6" : true,
    "node" : true
  },
  "extends" : [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "globals" : {
    "Atomics" : false,
    "SharedArrayBuffer" : false,
    "JSX" : false,
    "Record" : false,
    "paypal" : false
  },
  "parserOptions" : {
    "ecmaFeatures" : {
      "jsx" : true
    },
    "ecmaVersion" : 2020,
    "sourceType" : "module"
  },
  "plugins" : [
    "react",
    "react-hooks",
    "putout"
  ],
  "rules" : {
    "quotes" : [
      "error",
      "double"
    ],
    "comma-dangle" : [
      "error",
      "never"
    ],
    "key-spacing" : [
      "error",
      {
        "beforeColon" : true
      }
    ],
    "semi" : "error",
    "@typescript-eslint/no-unused-vars" : ["error"],
    "@typescript-eslint/no-explicit-any" : ["error"],
    "@typescript-eslint/explicit-module-boundary-types" : ["error"],
    "@typescript-eslint/explicit-function-return-type" : ["error"],
    "@typescript-eslint/typedef" : [
      "error",
      {
        "parameter" : false,
        "arrowParameter" : true
      }
    ],
    "no-extra-boolean-cast" : 0,
    "no-trailing-spaces" : 0,
    "object-curly-spacing" : [
      "error",
      "always"
    ],
    "newline-per-chained-call" : [
      "error",
      {
        "ignoreChainWithDepth" : 2
      }
    ],
    "indent" : [
      "error",
      2,
      {
        "SwitchCase" : 1
      }
    ],
    "one-var-declaration-per-line" : [
      "error",
      "initializations"
    ],
    "object-curly-newline" : [
      "error",
      {
        "multiline" : true,
        "minProperties" : 1
      }
    ],
    "object-property-newline" : "error",
    "array-element-newline" : [
      "error",
      "always"
    ],
    "camelcase" : "error",
    "jsx-quotes" : [
      "error",
      "prefer-double"
    ],
    "no-multiple-empty-lines" : "error",
    "putout/multiple-properties-destructuring" : "error",
    "react/destructuring-assignment" : [
      "error",
      "always"
    ],
    "react/jsx-closing-bracket-location" : [
      "error",
      "after-props"
    ],
    "react/jsx-max-props-per-line" : "error",
    "react/jsx-first-prop-new-line" : "error",
    "react/jsx-no-duplicate-props" : "error",
    "react/jsx-tag-spacing" : [
      "error",
      {
        "closingSlash" : "never",
        "beforeSelfClosing" : "always",
        "afterOpening" : "never",
        "beforeClosing" : "allow"
      }
    ],
    "react/jsx-uses-react" : "error",
    "react-hooks/rules-of-hooks" : "error",
    "react-hooks/exhaustive-deps" : "error",
    "react/prop-types" : 0,
    "react/jsx-curly-spacing" : [
      2,
      "always"
    ]
  },
  "settings" : {
    "react" : {
      "version" : "detect"
    }
  }
};
