module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'plugin:react/jsx-runtime',
  ],
  globals: {
    URL: false,
    BROWSER: false,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest'],
  rules: {
    'no-continue': 1,
    'no-cond-assign': 1,
    'react/prop-types': 0,
    'prefer-destructuring': 1,
    'no-use-before-define': 1,
    'no-underscore-dangle': 0,
    'prefer-object-spread': 0,
    'import/no-named-as-default': 0,
    'react/state-in-constructor': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 1,
    'react/destructuring-assignment': 0,
  },
};
