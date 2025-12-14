import assert from 'node:assert';
import simulant from 'simulant';
import function_ from '../../index.js';

before(function () {
	window.fixture.load('/test/automated/fixtures/index.html');
	document.body.append(window.fixture.el);
});

after(function () {
	window.fixture.cleanup();
});

it('should create instance', function () {
	const element = /** @type {HTMLInputElement} */ (document.querySelector('.jackie'));
	const instance = function_(element);

	assert.ok(element.classList.contains('Stylefileinput-input'));
	assert.ok(typeof function_.defaultOptions !== 'undefined');

	instance.destroy();
});

it('should destroy instance', function () {
	const element = /** @type {HTMLInputElement} */ (document.querySelector('.jackie'));
	const instance = function_(element);

	instance.destroy();

	assert.ok(!element.classList.contains('Stylefileinput-input'));
});

it('should reposition input element on mouse move', function () {
	const element = /** @type {HTMLInputElement} */ (document.querySelector('.jackie'));
	const instance = function_(element);
	const elementWrapper = element.parentNode;

	assert.ok(elementWrapper);

	simulant.fire(elementWrapper, 'mousemove');

	assert.ok(parseInt(element.style.left, 10) !== 0);
	assert.ok(parseInt(element.style.top, 10) !== 0);

	instance.destroy();
});
