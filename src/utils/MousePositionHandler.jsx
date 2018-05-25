// @flow

import BrowserPosition from "../models/BrowserPosition";

export const mousePositionHandler = (callback: BrowserPosition => void) => (
	event: SyntheticMouseEvent<HTMLDivElement>
) => {
	if (event.currentTarget != null) {
		const absoluteMousePosition = getAbsoluteMousePosition(event);
		const element = event.currentTarget;
		const relativeMousePosition = getRelativeMousePosition(
			element,
			absoluteMousePosition
		);
		callback(relativeMousePosition);
	}
};

const getAbsoluteMousePosition = (
	event: SyntheticMouseEvent<HTMLDivElement>
): BrowserPosition => {
	// https://www.quirksmode.org/js/events_properties.html#position
	if (event.pageX || event.pageY) {
		return new BrowserPosition(event.pageX, event.pageY);
	} else if (event.clientX || event.clientY) {
		let x = 0;
		let y = 0;
		if (document.body != null && document.documentElement != null) {
			x =
				event.clientX +
				document.body.scrollLeft +
				document.documentElement.scrollLeft;
			y =
				event.clientY +
				document.body.scrollTop +
				document.documentElement.scrollTop;
		}
		return new BrowserPosition(x, y);
	}
	return new BrowserPosition(0, 0);
};

const getRelativeMousePosition = (
	element: HTMLElement,
	absoluteMousePosition: BrowserPosition
): BrowserPosition => {
	// https://www.quirksmode.org/js/findpos.html
	let elementPosition = new BrowserPosition(0, 0);
	let scrollPosition = new BrowserPosition(0, 0);
	if (element.offsetParent) {
		// check browser support
		let parentElement: any = element;
		do {
			elementPosition.xposition += parentElement.offsetLeft;
			elementPosition.yposition += parentElement.offsetTop;
			// use also the current scroll position of all parent elements
			scrollPosition.xposition += parentElement.scrollLeft;
			scrollPosition.yposition += parentElement.scrollTop;
			parentElement = parentElement.offsetParent;
		} while (parentElement != null);
	}
	return new BrowserPosition(
		absoluteMousePosition.xposition -
			elementPosition.xposition +
			scrollPosition.xposition,
		absoluteMousePosition.yposition -
			elementPosition.yposition +
			scrollPosition.yposition
	);
};
