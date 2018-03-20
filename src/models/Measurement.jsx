// @flow
export default class Measurement {
	id: string;
	description: string;
	date: Date;

	constructor(id: string, description: string, date: Date) {
		this.id = id;
		this.description = description;
		this.date = date;
	}
}
