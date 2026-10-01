export default [
  {
    ignores: ['frontend/dist/**', 'node_modules/**'],
  },
  {
    files: ['frontend/src/**/*.{js,jsx}', 'backend/src/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        process: 'readonly',
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        Event: 'readonly',
        localStorage: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'error',
      'no-console': 'off',
    },
  },
];
