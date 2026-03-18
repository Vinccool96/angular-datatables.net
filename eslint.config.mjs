// @ts-check
import { fileURLToPath } from 'node:url';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import angular from 'angular-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import perfectionist from 'eslint-plugin-perfectionist';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import { includeIgnoreFile } from '@eslint/compat';

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

export default tseslint.config(
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
      eslintPluginUnicorn.configs.recommended,
      perfectionist.configs['recommended-natural'],
      jsdocPlugin.configs['flat/recommended-typescript-error'],
    ],
    settings: {
      perfectionist: {
        order: 'asc',
        partitionByComment: true,
        type: 'natural',
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/explicit-function-return-type': ['error', { allowHigherOrderFunctions: false }],
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: false,
          allowNever: false,
          allowRegExp: false,
        },
      ],
      '@typescript-eslint/strict-boolean-expressions': ['error', { allowNullableObject: false, allowString: false }],
      '@typescript-eslint/unbound-method': [
        'error',
        {
          ignoreStatic: true,
        },
      ],
      'curly': 'error',
      'eqeqeq': 'error',
      'no-multi-assign': 'error',
      'perfectionist/sort-classes': [
        'error',
        {
          groups: [
            'index-signature',
            ['property', 'accessor-property'],
            ['protected-property', 'protected-accessor-property'],
            ['private-property', 'private-accessor-property'],
            'constructor',
            'method',
            'protected-method',
            'private-method',
            ['get-method', 'set-method'],
            'static-property',
            'static-block',
            'static-method',
            'unknown',
          ],
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          groups: ['keyword', 'unknown', 'nullish'],
          type: 'natural',
        },
      ],
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            ref: false,
            dir: false,
          },
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'perfectionist/sort-interfaces': [
        'error',
        {
          customGroups: [
            {
              elementNamePattern: '^id$',
              groupName: 'first',
            },
          ],
          groups: ['first', 'unknown'],
          type: 'natural',
          useConfigurationIf: {
            declarationMatchesPattern: 'Form$',
          },
        },
        {
          type: 'natural',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.builtin,
        ...globals.jasmine,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ['**/dist/**/*'],
  },
);
