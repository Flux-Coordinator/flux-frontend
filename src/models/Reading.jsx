// @flow
export default class Reading {
	luxValue: number;
	timeStamp: number;
	yposition: number;
	xposition: number;
	zposition: number;

	constructor({ luxValue, timestamp, yposition, xposition, zposition }) {
		this.luxValue = this.luxValue;
		this.timeStamp = timestamp;
		this.yposition = yposition;
		this.xposition = xposition;
		this.zposition = zposition;
	}

	static fromObject({ luxValue, timeStamp, yposition, xposition, zposition }) {
		return new Reading({
			luxValue,
			timeStamp,
			yposition,
			xposition,
			zposition
		});
	}
}
