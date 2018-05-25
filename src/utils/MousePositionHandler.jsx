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
		return new BrowserPosition(
			event.clientX +
				document.body.scrollLeft +
				document.documentElement.scrollLeft,
			event.clientY +
				document.body.scrollTop +
				document.documentElement.scrollTop
		);
	}
};

const getRelativeMousePosition = (
	element: HTMLDivElement,
	absoluteMousePosition: BrowserPosition
): BrowserPosition => {
	// https://www.quirksmode.org/js/findpos.html
	let elementPosition = new BrowserPosition(0, 0);
	let scrollPosition = new BrowserPosition(0, 0);
	if (element.offsetParent) {
		// check browser support
		do {
			elementPosition.xposition += element.offsetLeft;
			elementPosition.yposition += element.offsetTop;
			// use also the current scroll position of all parent elements
			scrollPosition.xposition += element.scrollLeft;
			scrollPosition.yposition += element.scrollTop;
		} while ((element = element.offsetParent));
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
