import './index.css';
import stylefileinput from '../../index.js';

// Basic element

const basicElement = /** @type {HTMLInputElement} */ (
	document.querySelector('.Test-run--basicElement input[type="file"]')
);
let basicElementInstance = stylefileinput(basicElement);

/** @type {HTMLButtonElement} */ (
	document.querySelector('.Test-run--basicElement .Action--destroyInstance')
).addEventListener(
	'click',
	() => {
		basicElementInstance.destroy();
	},
	false
);
/** @type {HTMLButtonElement} */ (
	document.querySelector('.Test-run--basicElement .Action--createInstance')
).addEventListener(
	'click',
	() => {
		basicElementInstance = stylefileinput(basicElement);
	},
	false
);
