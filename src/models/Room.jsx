// @flow
import Measurement from "./Measurement";

type ConstructorType = {
	name: string,
	description: string,
	measurements: Measurement[] | any,
	length: number,
	width: number
};

export default class Room {
	name: string;
	description: string;
	measurements: Measurement[];
	length: number;
	width: number;

	constructor(
		name: string,
		description: string,
		measurements: Measurement[],
		length: number,
		width: number
	) {
		this.name = name;
		this.description = description;
		this.measurements = measurements;
		this.length = length;
		this.width = width;
	}

	static fromObject({
		name,
		description,
		measurements,
		length,
		width
	}: ConstructorType) {
		const typedMeasurements: Measurement[] = [];
		measurements.forEach(m => {
			typedMeasurements.push(
				new Measurement(m.measurementId, m.description, m.startDate, m.endDate)
			);
		});

		return new Room(name, description, typedMeasurements, length, width);
	}
}
