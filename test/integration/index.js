import assert from 'node:assert';
import path from 'node:path';
import { browser, $ } from '@wdio/globals';

describe('Default', function () {
	it('should handle file input change', async function () {
		const fileOne = path.resolve(import.meta.dirname, '../manual/fixtures/corgi-01.jpg');
		const fileTwo = path.resolve(import.meta.dirname, '../manual/fixtures/corgi-02.jpg');
		const selector = '.Test-run--basicElement input[type="file"]';

		await browser.url('/');

		assert.equal(await $('.Test-run--basicElement .Stylefileinput-button').getText(), 'Browse');
		assert.equal(
			await $('.Test-run--basicElement .Stylefileinput-text').getText(),
			'No file selected'
		);

		await addFile(browser, selector, fileOne);

		assert.ok(/corgi-01.jpg/.test(await $(selector).getValue()));
		assert.equal(await $('.Test-run--basicElement .Stylefileinput-button').getText(), 'Change');
		assert.ok(
			/corgi-01.jpg/.test(await $('.Test-run--basicElement .Stylefileinput-text').getText())
		);

		await $(selector).clearValue();

		await addFile(browser, selector, fileTwo);

		assert.ok(/corgi-02.jpg/.test(await $(selector).getValue()));
		assert.ok(
			/corgi-02.jpg/.test(await $('.Test-run--basicElement .Stylefileinput-text').getText())
		);
	});
});

/**
 * @param {import('webdriverio').Browser} browser
 * @param {string} selector
 * @param {string} file
 */
async function addFile(browser, selector, file) {
	const remoteFile = await browser.uploadFile(file);
	await $(selector).addValue(remoteFile);
}
