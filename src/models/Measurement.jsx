// @flow
export default class Measurement {
	measurementId: string;
	description: string;
	date: Date;

	constructor(id: string, description: string, date: Date) {
		this.measurementId = id;
		this.description = description;
		this.date = date;
	}
}
