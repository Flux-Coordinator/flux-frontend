// @flow
export default class Measurement {
	measurementId: string;
	description: string;
	startDate: Date;

	constructor(id: string, description: string, startDate: Date, endDate: Date) {
		this.measurementId = id;
		this.description = description;

		if (typeof date === "string") {
			this.startDate = new Date(startDate);
		} else {
			this.startDate = startDate;
		}
	}
}
