module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
  },
};
