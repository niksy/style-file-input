import path from 'node:path';
import fs from 'node:fs';
import stdLibBrowser from 'node-stdlib-browser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import inject from '@rollup/plugin-inject';
import babel from '@rollup/plugin-babel';
import istanbul from 'rollup-plugin-istanbul';
import rollupConfig from './rollup.config.js';

let config;

const isCI = typeof process.env.CI !== 'undefined' && process.env.CI !== 'false';
const isPR =
	typeof process.env.GITHUB_HEAD_REF !== 'undefined' && process.env.GITHUB_HEAD_REF !== '';
const local = !isCI || (isCI && isPR);

const port = 0;

if (local) {
	config = {
		browsers: ['Chrome']
	};
} else {
	config = {
		hostname: 'bs-local.com',
		browserStack: {
			username: process.env.BROWSER_STACK_USERNAME,
			accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
			startTunnel: true,
			project: 'style-file-input',
			name: 'Automated (Karma)',
			build: 'Automated (Karma)'
		},
		customLaunchers: {
			'BS-Chrome': {
				'base': 'BrowserStack',
				'project': 'style-file-input',
				'build': 'Automated (Karma)',
				'browser': 'Chrome',
				'browser_version': '88',
				'name': 'Chrome',
				'os': 'Windows',
				'os_version': '7'
			},
			'BS-Edge': {
				'base': 'BrowserStack',
				'project': 'style-file-input',
				'build': 'Automated (Karma)',
				'browser': 'Edge',
				'browser_version': '88',
				'name': 'Edge',
				'os': 'Windows',
				'os_version': '10'
			},
			'BS-Firefox': {
				'base': 'BrowserStack',
				'project': 'style-file-input',
				'build': 'Automated (Karma)',
				'browser': 'Firefox',
				'browser_version': '85',
				'name': 'Firefox',
				'os': 'Windows',
				'os_version': '7'
			}
		},
		browsers: ['BS-Chrome', 'BS-Edge', 'BS-Firefox']
	};
}

export default function (baseConfig) {
	baseConfig.set({
		basePath: '',
		frameworks: ['mocha', 'fixture'],
		files: ['test/automated/**/*.html', { pattern: 'test/automated/**/*.js', watched: false }],
		exclude: [],
		preprocessors: {
			'test/automated/**/*.html': ['html2js'],
			'test/automated/**/*.js': ['rollup', 'sourcemap']
		},
		reporters: ['coverage', 'mocha'],
		port: port,
		colors: true,
		logLevel: baseConfig.LOG_INFO,
		autoWatch: false,
		client: {
			captureConsole: true
		},
		browserConsoleLogOptions: {
			level: 'log',
			format: '%b %T: %m',
			terminal: true
		},
		rollupPreprocessor: {
			plugins: [
				istanbul({
					exclude: ['test/automated/**/*.js', 'node_modules/**/*']
				}),
				resolve({
					browser: true,
					preferBuiltins: true
				}),
				commonjs(),
				alias({
					entries: stdLibBrowser
				}),
				json(),
				inject({
					process: stdLibBrowser.process,
					Buffer: [stdLibBrowser.buffer, 'Buffer']
				}),
				babel({
					exclude: 'node_modules/**',
					babelHelpers: 'runtime'
				}),
				babel({
					include: 'node_modules/{has-flag,supports-color}/**',
					babelHelpers: 'runtime',
					babelrc: false,
					configFile: path.resolve(import.meta.dirname, 'babel.config.js')
				}),
				...rollupConfig.plugins.filter(
					({ name }) => !['babel', 'package-type', 'types'].includes(name)
				)
			],
			output: {
				format: 'iife',
				name: 'styleFileInput',
				sourcemap: baseConfig.autoWatch ? false : 'inline', // Source map support has weird behavior in watch mode
				intro: 'window.TYPED_ARRAY_SUPPORT = false;' // IE9
			}
		},
		coverageReporter: {
			dir: path.join(import.meta.dirname, 'coverage'),
			reporters: [{ type: 'html' }, { type: 'text' }],
			check: {
				global: JSON.parse(
					fs.readFileSync(path.join(import.meta.dirname, '.nycrc'), 'utf8')
				)
			}
		},
		singleRun: true,
		concurrency: Infinity,
		...config
	});
}
