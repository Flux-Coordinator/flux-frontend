// @flow

type ConstructorType = {
    readingId: ?number,
	luxValue: number,
	timestamp: Date,
    xposition: number,
	yposition: number,
	zposition: number
};

export default class Reading {
    readingId: ?number;
	luxValue: number;
	timestamp: Date;
    xposition: number;
	yposition: number;
	zposition: number;

	constructor(
        readingId: ?number,
		luxValue: number,
		timestamp: Date,
        xposition: number,
		yposition: number,
		zposition: number
	) {
		this.readingId = readingId;
		this.luxValue = luxValue;

        if (typeof timestamp === "number" || typeof timestamp === "string") {
            this.timestamp = new Date(timestamp);
        } else {
            this.timestamp = timestamp;
        }

        this.xposition = xposition;
		this.yposition = yposition;
		this.zposition = zposition;
	}

	static fromObject({
	  	readingId,
	  	luxValue,
		timestamp,
	  	xposition,
		yposition,
		zposition
	}: ConstructorType) {
		return new Reading(readingId, luxValue, timestamp, xposition, yposition, zposition);
	}
}
