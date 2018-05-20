// @flow
import Reading from "./Reading";

type ConstructorType = {
	measurementId: number,
	description: string,
	startDate: Date,
	endDate: Date,
	measurementState: string,
	readings?: Reading[]
};

export default class Measurement {
	measurementId: number;
	description: string;
	startDate: Date;
	endDate: Date;
	state: string;
	readings: Reading[];

	constructor(
		measurementId: number,
		description: string,
		startDate: Date,
		endDate: Date,
		state: string,
		readings?: Reading[]
	) {
		this.measurementId = measurementId;
		this.description = description;
		this.state = state;

		if (readings) {
			this.readings = readings;
		}

		if (typeof startDate === "number" || typeof startDate === "string") {
			this.startDate = new Date(startDate);
		} else {
			this.startDate = startDate;
		}

		if (typeof endDate === "number" || typeof endDate === "string") {
			this.endDate = new Date(endDate);
		} else {
			this.endDate = endDate;
		}
	}

	static fromObject({
		measurementId,
		description,
		startDate,
		endDate,
		measurementState,
		readings
	}: ConstructorType) {
		return new Measurement(
			measurementId,
			description,
			startDate,
			endDate,
			measurementState,
			readings
		);
	}
}
