// @ts-ignore
import classListMultipleValues from 'classlist-multiple-values';

/**
 * @typedef {typeof defaultOptions} Options
 */

const defaultOptions = {
	browseButtonLabel: 'Browse',
	changeButtonLabel: 'Change',
	noFileSelectedText: 'No file selected',
	wrapperClass: 'Stylefileinput',
	inputClass: 'Stylefileinput-input',
	buttonClass: 'Stylefileinput-button',
	textClass: 'Stylefileinput-text'
};

class Stylefileinput {
	/**
	 * @param {HTMLInputElement} element
	 * @param {Options=} options
	 */
	constructor(element, options) {
		this.element = element;
		this.options = {
			...defaultOptions,
			...options
		};

		this.prepareClassList();

		this.setupDom();
		this.setupEvents();
	}

	prepareClassList() {
		const clmv = classListMultipleValues(this.element.classList);

		this.classList = {
			add: clmv.add,
			remove: clmv.remove
		};
	}

	setupDom() {
		this.classList?.add(this.options.inputClass);

		this.wrapperElement = document.createElement('div');
		this.wrapperClassList = classListMultipleValues(this.wrapperElement.classList);
		this.wrapperClassList.add(this.options.wrapperClass);

		this.buttonElement = document.createElement('span');
		this.buttonClassList = classListMultipleValues(this.buttonElement.classList);
		this.buttonClassList.add(this.options.buttonClass);
		this.buttonElement.setAttribute('aria-hidden', 'true');
		this.buttonElement.textContent = this.options.browseButtonLabel;

		this.fileNameElement = document.createElement('span');
		this.fileNameClassList = classListMultipleValues(this.fileNameElement.classList);
		this.fileNameClassList.add(this.options.textClass);
		this.fileNameElement.setAttribute('aria-hidden', 'true');
		this.fileNameElement.textContent = this.options.noFileSelectedText;

		this.element.parentNode?.insertBefore(this.wrapperElement, this.element);
		this.wrapperElement.appendChild(this.element);
		this.wrapperElement.appendChild(this.buttonElement);
		this.wrapperElement.appendChild(this.fileNameElement);
	}

	destroyDom() {
		this.classList?.remove(this.options.inputClass);
		this.wrapperElement?.parentNode?.appendChild(this.element);
		this.wrapperElement?.parentNode?.removeChild(this.wrapperElement);
		this.element.style.left = '';
		this.element.style.top = '';
	}

	setupEvents() {
		this.eventListeners = {
			focus: this.handleFocus.bind(this),
			blur: this.handleCheckChange.bind(this),
			change: this.handleChange.bind(this),
			click: this.handleClick.bind(this)
		};

		this.wrapperEventListeners = {
			mousemove: this.positionInput.bind(this)
		};

		Object.keys(this.eventListeners).forEach((event_) => {
			// @ts-ignore
			const listener = this.eventListeners[event_];
			this.element.addEventListener(event_, listener, false);
		});

		Object.keys(this.wrapperEventListeners).forEach((event_) => {
			// @ts-ignore
			const listener = this.wrapperEventListeners[event_];
			this.wrapperElement?.addEventListener(event_, listener, false);
		});
	}

	destroyEvents() {
		Object.keys(this.eventListeners ?? {}).forEach((event_) => {
			// @ts-ignore
			const listener = this.eventListeners[event_];
			this.element.removeEventListener(event_, listener, false);
		});

		Object.keys(this.wrapperEventListeners ?? {}).forEach((event_) => {
			// @ts-ignore
			const listener = this.wrapperEventListeners[event_];
			this.wrapperElement?.removeEventListener(event_, listener, false);
		});
	}

	destroy() {
		this.destroyDom();
		this.destroyEvents();
	}

	/* istanbul ignore next:
	integration test */ handleFocus() {
		this.currentValue = this.element.value;
	}

	/* istanbul ignore next:
	integration test */ handleCheckChange() {
		if (this.element.value && this.element.value !== this.currentValue) {
			this.handleChange();
		}
	}

	/* istanbul ignore next:
	integration test */ handleChange() {
		let fileName = this.element.value.split('\\').pop();
		let buttonLabel = this.options.changeButtonLabel;

		if (!fileName) {
			fileName = this.options.noFileSelectedText;
			buttonLabel = this.options.browseButtonLabel;
		}

		if (this.fileNameElement) {
			this.fileNameElement.textContent = fileName;
		}
		if (this.buttonElement) {
			this.buttonElement.textContent = buttonLabel;
		}
	}

	/* istanbul ignore next:
	integration test */ handleClick() {
		this.currentValue = this.element.value;

		// For IE and Opera, make sure change fires after choosing a file, using an async callback
		setTimeout(() => {
			this.handleCheckChange();
		}, 100);
	}

	/**
	 * @param  {MouseEvent} event
	 */
	positionInput(event) {
		if (this.wrapperElement) {
			const wrapperElementOffset = globalOffset(this.wrapperElement);
			const offsetTop = wrapperElementOffset.top;
			const offsetLeft = wrapperElementOffset.left;

			this.element.style.left = `${event.pageX - offsetLeft - this.element.offsetWidth + 20}px`;
			this.element.style.top = `${event.pageY - offsetTop - 10}px`;
		}
	}
}

/**
 * @param  {HTMLElement} element
 */
function globalOffset(element) {
	const rect = element.getBoundingClientRect();
	const top = rect.top;
	const left = rect.left;

	const _window = window;
	const pageYOffset = _window.pageYOffset;
	const pageXOffset = _window.pageXOffset;

	return {
		top: top + pageYOffset,
		left: left + pageXOffset
	};
}

/**
 * @param {HTMLInputElement} element
 * @param {Options=} options
 */
export default (element, options) => {
	const instance = new Stylefileinput(element, options);
	return {
		destroy: () => {
			instance.destroy();
		}
	};
};

export { defaultOptions };
