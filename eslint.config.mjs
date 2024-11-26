import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwindcss from 'eslint-plugin-tailwindcss'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

const ESLINT_CONFIG = [
	{
		ignores: ['components/ui/*', '**/tailwind.config.ts', 'convex/_generated/*', '.next/*'],
	},
	...compat.extends(
		'next/core-web-vitals',
		'plugin:@typescript-eslint/recommended',
		'plugin:@tanstack/query/recommended',
		'plugin:tailwindcss/recommended',
		'plugin:eslint-plugin-prettier/recommended'
	),
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			// import rules
			'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
			'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
			'import/order': 'off', // Avoid conflict rule between `eslint-plugin-import` and `eslint-plugin-simple-import-sort`
			'import/extensions': 'off', // Avoid missing file extension errors, TypeScript already provides a similar feature
			'unused-imports/no-unused-imports': 'off',

			'unused-imports/no-unused-vars': [
				'off',
				{
					argsIgnorePattern: '^_',
				},
			],
		},
	},
	{
		plugins: {
			react,
			typescriptEslint,
			tanstackQuery,
			tailwindcss,
			eslintPluginPrettierRecommended,
		},
		languageOptions: {
			// parser: tsParser,
		},

		settings: {
			tailwindcss: {
				callees: ['cn', 'clsx', 'classnames'],
			},
		},
		// files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
		rules: {
			//react
			'react/jsx-uses-react': 'error',
			'react/jsx-uses-vars': 'error',

			//typescriptEslint
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/consistent-type-imports': 'error',

			//tanstackQuery
			'@tanstack/query/exhaustive-deps': 'error',

			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					endOfLine: 'auto',
				},
			],

			// tailwindcss / eslintPluginPrettierRecommended
			'tailwindcss/classnames-order': 'warn',
			'tailwindcss/no-contradicting-classname': 'error',
			'tailwindcss/no-custom-classname': 'off',
			semi: 'off',
		},
	},
]

export default ESLINT_CONFIG
