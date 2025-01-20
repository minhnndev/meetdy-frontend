import js from '@eslint/js'
import parser from '@typescript-eslint/parser'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import typescript from '@typescript-eslint/eslint-plugin'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'prettier': eslintPluginPrettier,
      '@typescript-eslint': typescript,
      '@tanstack/query': pluginQuery,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@tanstack/query/exhaustive-deps': 'error',
      "@typescript-eslint/no-explicit-any" : "off",
      "@typescript-eslint/no-unused-vars": "off",
      'prettier/prettier':'error',
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'double'],
      semi: ['error', 'always'],
    },
  },
)
