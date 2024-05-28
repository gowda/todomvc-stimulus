module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  plugins: ['import'],
  parserOptions: {
    requireConfigFile: false,
  },
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'const', next: 'return' },
      { blankLine: 'always', prev: 'const', next: 'export' },
    ],
  },
  globals: {
    window: true,
  },
};
