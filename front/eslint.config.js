import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import totalFunctionsPlugin from 'eslint-plugin-total-functions';
import vitestPlugin from 'eslint-plugin-vitest';

export default [
  js.configs.recommended,
  {
    ignores: ['dist/', 'vite.config.d.ts'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      tailwindcss: tailwindcssPlugin,
      prettier: prettierPlugin,
      'total-functions': totalFunctionsPlugin,
      vitest: vitestPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'tailwindcss/no-custom-classname': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      //'total-functions/no-unsafe-type-assertion': 'error',
      'no-implicit-coercion': 'error',
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        {
          allowBoolean: false,
          allowNullish: false,
          allowNumberAndString: false,
          allowRegExp: false,
          allowAny: false,
          skipCompoundAssignments: false,
        },
      ],
      'prefer-template': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      semi: ['error', 'always'],
      'no-plusplus': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      tailwindcss: tailwindcssPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      'react/react-in-jsx-scope': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-implicit-coercion': 'error',
      'prefer-template': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      semi: ['error', 'always'],
      'no-plusplus': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      'vitest/no-conditional-in-test': 'error',
      'vitest/valid-expect': 'error',
    },
  },
];
