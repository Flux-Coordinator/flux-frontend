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
		measurements: Measurement[] = []
	) {
		this.name = name;
		this.description = description;
		this.measurements = measurements;
	}
}
