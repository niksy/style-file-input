import configBase from 'eslint-config-nitpick';
import configTypescript from 'eslint-config-nitpick/typescript';
import configBrowser from 'eslint-config-nitpick/browser';
import configTests from 'eslint-config-nitpick/tests';
import configPrettier from 'eslint-config-prettier/flat';
import pluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
	configBase,
	configTypescript,
	configBrowser,
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
		files: ['test/manual/rollup.config.js', 'karma.conf.js', 'rollup.config.js'],
		languageOptions: {
			globals: {
				...globals.node
			}
		},
		rules: {
			'no-console': 0
		}
	},
	{
		files: ['test/**/*'],
		...configTests,
		ignores: ['**/fixtures']
	}
];
