// @flow

type ConstructorType = {
	xOffset: ?number,
	yOffset: ?number,
	scaleFactor: ?number,
	targetWidth: ?number
};

export default class Transformation {
	xOffset: number;
	yOffset: number;
	scaleFactor: number;
	targetWidth: ?number;

	constructor(
		xOffset: ?number,
		yOffset: ?number,
		scaleFactor: ?number,
		targetWidth: ?number
	) {
		this.xOffset = xOffset != null ? xOffset : 0;
		this.yOffset = yOffset != null ? yOffset : 0;
		this.scaleFactor = scaleFactor != null ? scaleFactor : 0;
		this.targetWidth = targetWidth;
	}

	static fromObject({
		xOffset,
		yOffset,
		scaleFactor,
		targetWidth
	}: ConstructorType) {
		return new Transformation(xOffset, yOffset, scaleFactor, targetWidth);
	}
}
