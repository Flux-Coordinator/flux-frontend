// @flow

export class Measurement {
	id: string;
	description: string;
	date: Date;

	constructor(id: string, description: string, date: Date) {
		this.id = id;
		this.description = description;
		this.date = date;
	}
}

export class Room {
	id: string;
	name: string;
	measurements: Measurement[];

	constructor(id: string, name: string, measurements: Measurement[]) {
		this.id = id;
		this.name = name;
		this.measurements = measurements;
	}
}

export class Project {
	id: string;
	name: string;
	rooms: Room[];

	constructor(id: string, name: string, rooms: Room[]) {
		this.id = id;
		this.name = name;
		this.rooms = rooms;
	}
}
