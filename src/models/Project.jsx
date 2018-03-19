// @flow

import { Room } from "./Room";

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
