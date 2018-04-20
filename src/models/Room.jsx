// @flow
import Measurement from "./Measurement";

export default class Room {
	name: string;
	description: string;
	measurements: Measurement[];
	length: number;
	width: number;

	constructor(
		name: string,
		description: string = "",
		measurements: Measurement[] = [],
		length: number = 0,
		width: number = 0
	) {
		this.name = name;
		this.description = description;
		this.measurements = measurements;
		this.length = length;
		this.width = width;
	}

	static fromObject({ name, description, measurements, length, width }) {
		const realMeasurements: Measurement = [];
		measurements.forEach(m => {
			realMeasurements.push(Measurement.fromObject(m));
		});

		return new Room(name, description, realMeasurements, length, width);
	}
}
