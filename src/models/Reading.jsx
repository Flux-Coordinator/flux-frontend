// @flow

type ConstructorType = {
	luxValue: number,
	timeStamp: number,
	yposition: number,
	xposition: number,
	zposition: number
};

export default class Reading {
	luxValue: number;
	timeStamp: number;
	yposition: number;
	xposition: number;
	zposition: number;

	constructor(
		luxValue: number,
		timeStamp: number,
		yposition: number,
		xposition: number,
		zposition: number
	) {
		this.luxValue = this.luxValue;
		this.timeStamp = timeStamp;
		this.yposition = yposition;
		this.xposition = xposition;
		this.zposition = zposition;
	}

	static fromObject({
		luxValue,
		timeStamp,
		yposition,
		xposition,
		zposition
	}: ConstructorType) {
		return new Reading(luxValue, timeStamp, yposition, xposition, zposition);
	}
}
