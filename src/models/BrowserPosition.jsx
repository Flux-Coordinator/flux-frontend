// @flow

type ConstructorType = {
	xposition: number,
	yposition: number
};

export default class BrowserPosition {
	xposition: number;
	yposition: number;

	constructor(xposition: number, yposition: number) {
		this.xposition = xposition;
		this.yposition = yposition;
	}

	static fromObject({ xposition, yposition }: ConstructorType) {
		return new BrowserPosition(xposition, yposition);
	}
}
