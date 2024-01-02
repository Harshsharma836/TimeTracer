module.exports = {
  extends: [
    'airbnb-typescript/base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
    'prettier', 
    // 'eslint:recommended'
  ],
  parserOptions: {
    "ecmaVersion" : "12",
    project: './tsconfig.json',
  },
  rules: {
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // '@typescript-eslint/naming-convention':  'error',
    // "no-unused-vars": ["error", { "vars": "all"}],
    // "no-unnessary-conditions" : "error",

    // '@typescript-eslint/indent': ['error', 2],

  },
  plugins: ['prettier'],
};



