import './index.css';
import stylefileinput from '../../index.js';

// Basic element

const basicElement = document.querySelector('.Test-run--basicElement input[type="file"]');
let basicElementInstance = stylefileinput(basicElement);

document.querySelector('.Test-run--basicElement .Action--destroyInstance').addEventListener(
	'click',
	() => {
		basicElementInstance.destroy();
	},
	false
);
document.querySelector('.Test-run--basicElement .Action--createInstance').addEventListener(
	'click',
	() => {
		basicElementInstance = stylefileinput(basicElement);
	},
	false
);
