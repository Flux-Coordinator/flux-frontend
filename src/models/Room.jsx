// @flow
import Measurement from "./Measurement";

export default class Room {
	roomId: string;
	name: string;
	description: string;
	measurements: Measurement[];
	length: number;
	width: number;

	constructor(
		id: string,
		name: string,
		description: string = "",
		measurements: Measurement[] = []
	) {
		this.roomId = id;
		this.name = name;
		this.description = description;
		this.measurements = measurements;
	}
}
