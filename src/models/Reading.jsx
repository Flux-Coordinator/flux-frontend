// @flow
import PositionModel from "./Position";
import { Positionable } from "../types/Positionable";

type ConstructorType = {
	readingId: ?number,
	luxValue: number,
	timestamp: Date,
	xposition: number,
	yposition: number,
	zposition: number
};

export default class Reading implements Positionable {
	readingId: ?number;
	luxValue: number;
	timestamp: Date;
	position: PositionModel;
	getValue = () => this.luxValue;

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

		this.position = new PositionModel(xposition, yposition, zposition);
	}

	toDTO = () => ({
		readingId: this.readingId,
		luxValue: this.luxValue,
		timestamp: this.timestamp,
		...this.position
	});

	static fromObject({
		readingId,
		luxValue,
		timestamp,
		xposition,
		yposition,
		zposition
	}: ConstructorType) {
		return new Reading(
			readingId,
			luxValue,
			timestamp,
			xposition,
			yposition,
			zposition
		);
	}
}
