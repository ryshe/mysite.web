const productionErrorOrOff = process.env.NODE_ENV === 'production' ? 'error' : 'off';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['vuetify'],
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/airbnb',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': productionErrorOrOff,
    'no-debugger': productionErrorOrOff,
    'import/extensions': ['error', 'never', { svg: 'always', json: 'always' }],
    quotes: ['error', 'single', { avoidEscape: false, allowTemplateLiterals: true }],
    'prefer-template': 'off',
    'max-len': [
      'error',
      { code: 200, ignoreTemplateLiterals: true, ignoreStrings: true },
    ],
    'quote-props': 'off',
    'no-param-reassign': [2, { props: false }],
    'vue/valid-v-on': productionErrorOrOff,
    'no-unused-vars': 'warn',
    'no-plusplus': 'off',
    'consistent-return': 'warn',
    'comma-dangle': ['off'],
    'class-methods-use-this': ['off'],
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'no-return-assign': 'off',
    radix: 'off',
    'vuetify/no-deprecated-classes': 'error',
    'vuetify/grid-unknown-attributes': 'error', // use these to migrate to new grid system
    'vuetify/no-legacy-grid': 'error',
    'no-underscore-dangle': [
      'error',
      { enforceInMethodNames: true, allowAfterThis: true },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
