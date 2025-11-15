import assert from 'node:assert';
import simulant from 'simulant';
import function_ from '../../index.js';

before(function () {
	// @ts-expect-error
	const fixture = window.__html__['test/automated/fixtures/index.html'];
	document.body.insertAdjacentHTML('beforeend', `<div id="fixture">${fixture}</div>`);
});

after(function () {
	const element = /** @type {HTMLDivElement} */ (document.querySelector('#fixture'));
	document.body.removeChild(element);
});

it('should create instance', function () {
	const element = /** @type {HTMLInputElement} */ (document.querySelector('.jackie'));
	const instance = function_(element);

	assert.ok(element.classList.contains('Stylefileinput-input'));

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
