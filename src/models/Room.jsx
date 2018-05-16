// @flow
import Measurement from "./Measurement";
import Transformation from "./Transformation";

type ConstructorType = {
	name: string,
	description: string,
	measurements: Measurement[] | any,
	floorPlan: ?string,
	floorSpace: ?number,
	xOffset: ?number,
	yOffset: ?number,
	scaleFactor: ?number,
	roomId: ?number
};

export default class Room {
	roomId: ?number;
	name: string;
	description: string;
	measurements: Measurement[];
	floorPlan: ?string;
	floorSpace: ?number;
	transformation: Transformation;

	constructor(
		name: string,
		description: string,
		measurements: Measurement[] | any,
		floorPlan: ?string,
		floorSpace: ?number,
		xOffset: ?number,
		yOffset: ?number,
		scaleFactor: ?number,
		roomId: ?number
	) {
		this.name = name;
		this.description = description;
		this.measurements = measurements;
		this.floorPlan = floorPlan;
		this.floorSpace = floorSpace;
		this.transformation = new Transformation(xOffset, yOffset, scaleFactor);
		this.roomId = roomId;
	}

	static fromObject({
		name,
		description,
		measurements,
		floorPlan,
		floorSpace,
		xOffset,
		yOffset,
		scaleFactor,
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
			floorPlan,
			floorSpace,
			xOffset,
			yOffset,
			scaleFactor,
			roomId
		);
	}
}
