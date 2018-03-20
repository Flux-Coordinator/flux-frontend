// @flow
import Measurement from "./Measurement";

export default class Room {
	id: string;
	name: string;
	measurements: Measurement[];

	constructor(id: string, name: string, measurements: Measurement[]) {
		this.id = id;
		this.name = name;
		this.measurements = measurements;
	}
}
