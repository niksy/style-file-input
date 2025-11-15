import { defineConfig } from 'eslint/config';
import configBase from 'eslint-config-nitpick';
import configTypescript from 'eslint-config-nitpick/typescript';
import configBrowser from 'eslint-config-nitpick/browser';
import configTests from 'eslint-config-nitpick/tests';
import configPrettier from 'eslint-config-prettier/flat';
import pluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
	configBase,
	configTypescript,
	configPrettier,
	{
		plugins: {
			prettier: pluginPrettier
		},
		rules: {
			'prettier/prettier': 1
		}
	},
	{
		files: ['index.js', 'lib/**/*.js', 'test/**/*.js'],
		extends: [configBrowser],
		ignores: ['test/**/vite.config.js']
	},
	{
		files: ['test/**/*'],
		extends: [configTests],
		ignores: ['**/fixtures']
	}
]);
