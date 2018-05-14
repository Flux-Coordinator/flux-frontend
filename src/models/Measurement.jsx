// @flow

type ConstructorType = {
	measurementId: number,
	description: string,
	startDate: Date,
	endDate: Date
};

export default class Measurement {
	measurementId: number;
	description: string;
	startDate: Date;
	endDate: Date;

	constructor(
		measurementId: number,
		description: string,
		startDate: Date,
		endDate: Date
	) {
		this.measurementId = measurementId;
		this.description = description;

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
		endDate
	}: ConstructorType) {
		return new Measurement(measurementId, description, startDate, endDate);
	}
}
