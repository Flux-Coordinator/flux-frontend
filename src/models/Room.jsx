// @flow
import Measurement from "./Measurement";

type ConstructorType = {
	name: string,
	description: string,
	measurements: Measurement[] | any,
	length: number,
	width: number,
	roomId: ?number
};

export default class Room {
	roomId: ?number;
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
		width: number,
		roomId: ?number
	) {
		this.name = name;
		this.description = description;
		this.measurements = measurements;
		this.length = length;
		this.width = width;
		this.roomId = roomId;
	}

	static fromObject({
		name,
		description,
		measurements,
		length,
		width,
		roomId
	}: ConstructorType) {
		const typedMeasurements: Measurement[] = [];
		measurements.forEach(m => {
			typedMeasurements.push(
				new Measurement(m.measurementId, m.description, m.startDate, m.endDate)
			);
		});

		return new Room(
			name,
			description,
			typedMeasurements,
			length,
			width,
			roomId
		);
	}
}
