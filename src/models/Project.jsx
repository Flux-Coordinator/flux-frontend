// @flow
import Room from "./Room";

export default class Project {
	projectId: string;
	name: string;
	rooms: Room[];

	constructor(id: string = null, name: string, rooms: Room[]) {
		this.projectId = id;
		this.name = name;
		this.rooms = rooms;
	}
}
