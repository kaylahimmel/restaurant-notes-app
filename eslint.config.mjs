import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['jest.config.js'],
    languageOptions: {
      globals: { ...globals.node, ...globals.commonjs },
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', 'jest.setup.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];

export default eslintConfig;
