// @flow
import Measurement from "./Measurement";

type ConstructorType = {
	name: string,
	description: string,
	measurements: Measurement[] | any,
	floorPlan: ?string,
	floorSpace: ?number,
	roomId: ?number
};

export default class Room {
	roomId: ?number;
	name: string;
	description: string;
	measurements: Measurement[];
	floorPlan: ?string;
	floorSpace: ?number;

	constructor(
		name: string,
		description: string,
		measurements: Measurement[] | any,
		floorPlan: ?string,
		floorSpace: ?number,
		roomId: ?number
	) {
		this.name = name;
		this.description = description;
		this.measurements = measurements;
		this.floorPlan = floorPlan;
		this.floorSpace = floorSpace;
		this.roomId = roomId;
	}

	static fromObject({
		name,
		description,
		measurements,
		floorPlan,
		floorSpace,
		roomId
	}: ConstructorType) {
		const typedMeasurements: Measurement[] = [];
		measurements.forEach(m => {
			typedMeasurements.push(Measurement.fromObject((m: any)));
		});

		return new Room(
			name,
			description,
			typedMeasurements,
			floorPlan,
			floorSpace,
			roomId
		);
	}
}
