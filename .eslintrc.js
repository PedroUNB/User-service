module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: ['standard', 'plugin:@typescript-eslint/recommended', 'prettier', "plugin:security/recommended"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier', 'security'],
  rules: {
    'no-console': 'warn',
    'prettier/prettier': 'off',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'always'],
    "@typescript-eslint/explicit-module-boundary-types": "off"
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
};
