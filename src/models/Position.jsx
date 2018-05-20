// @flow

type ConstructorType = {
	xposition: number,
	yposition: number,
	zposition: number
};

export default class Position {
	xposition: number;
	yposition: number;
	zposition: number;

	constructor(xposition: number, yposition: number, zposition: number) {
		this.xposition = xposition;
		this.yposition = yposition;
		this.zposition = zposition;
	}

	static fromObject({ xposition, yposition, zposition }: ConstructorType) {
		return new Position(xposition, yposition, zposition);
	}
}
