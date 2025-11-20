/** @typedef {import('@wdio/types').Options.Testrunner & import('@wdio/types').Capabilities.WithRequestedTestrunnerCapabilities} WdioConfig */

import path from 'node:path';
import { createServer, build, preview } from 'vite';
import { browser } from '@wdio/globals';
import mochaConfig from './.mocharc.cjs';

let server,
	/** @type {WdioConfig} */
	browserConfig;

// Pull requests not handled as in case of Karma
const local = typeof process.env['CI'] === 'undefined' || process.env['CI'] === 'false';
const port = 9002;

if (local) {
	browserConfig = {
		baseUrl: `http://localhost:${port}`,
		services: ['docker'],
		dockerLogs: './wdio-docker-logs',
		dockerOptions: {
			image: 'selenium/standalone-chromium',
			healthCheck: 'http://localhost:4444',
			options: {
				p: ['4444:4444'],
				shmSize: '2g'
			}
		},
		capabilities: [
			{
				browserName: 'chrome'
			}
		]
	};
} else {
	browserConfig = {
		baseUrl: `http://localhost:${port}`,
		user: process.env.BROWSER_STACK_USERNAME,
		key: process.env.BROWSER_STACK_ACCESS_KEY,
		services: [
			[
				'browserstack',
				{
					browserstackLocal: true
				}
			]
		],
		capabilities: [
			{
				'browserName': 'Chrome',
				'browserVersion': '80',
				'bstack:options': {
					'networkLogs': false,
					'projectName': 'style-file-input',
					'buildName': 'Integration (WebdriverIO)',
					'os': 'Windows',
					'osVersion': '7'
				}
			},
			{
				'browserName': 'Edge',
				'browserVersion': '80',
				'bstack:options': {
					'networkLogs': false,
					'projectName': 'style-file-input',
					'buildName': 'Integration (WebdriverIO)',
					'os': 'Windows',
					'osVersion': '10'
				}
			},
			{
				'browserName': 'Firefox',
				'browserVersion': '72',
				'bstack:options': {
					'networkLogs': false,
					'projectName': 'style-file-input',
					'buildName': 'Integration (WebdriverIO)',
					'os': 'Windows',
					'osVersion': '7'
				}
			}
		]
	};
}

/** @type {WdioConfig} */
export const config = {
	specs: ['./test/integration/**/*.js'],
	exclude: [],
	maxInstances: 10,
	logLevel: 'info',
	waitforTimeout: 10_000,
	connectionRetryTimeout: 90_000,
	connectionRetryCount: 3,
	framework: 'mocha',
	reporters: ['spec'],
	mochaOpts: mochaConfig,
	injectGlobals: false,
	afterTest: async function (test) {
		if (!test.error) {
			return;
		}
		const filepath = path.join(import.meta.dirname, `wdio-error-shots/${Date.now()}.png`);
		await browser.saveScreenshot(filepath);
	},
	onPrepare: function (currentConfig) {
		return (async () => {
			const configFile = path.resolve(import.meta.dirname, 'test/manual/vite.config.js');
			if (process.env.WATCH_MODE === 'true') {
				server = await createServer({
					configFile: configFile,
					server: {
						port: port
					}
				});
				server.listen();
			} else {
				await build({
					configFile: configFile
				});
				server = await preview({
					configFile: configFile,
					logLevel: currentConfig.logLevel === 'verbose' ? 'info' : 'silent',
					preview: {
						port: port
					}
				});
			}
		})();
	},
	onComplete: function () {
		return new Promise((resolve, reject) => {
			server.close();
			resolve();
		});
	},
	...browserConfig
};
