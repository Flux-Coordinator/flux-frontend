// @flow

type ConstructorType = {
	xOffset: ?number,
	yOffset: ?number,
	scaleFactor: ?number
};

export default class Transformation {
	xOffset: number;
	yOffset: number;
	scaleFactor: number;

	constructor(xOffset: ?number, yOffset: ?number, scaleFactor: ?number) {
		this.xOffset = xOffset != null ? xOffset : 0;
		this.yOffset = yOffset != null ? yOffset : 0;
		this.scaleFactor = scaleFactor != null ? scaleFactor : 0;
	}

	static fromObject({ xOffset, yOffset, scaleFactor }: ConstructorType) {
		return new Transformation(xOffset, yOffset, scaleFactor);
	}
}
