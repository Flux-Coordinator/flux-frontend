// @flow
import Room from "./Room";

export default class Project {
	projectId: ?string;
	name: string;
	rooms: Room[];

	constructor(name: string, rooms: Room[], id: ?string = null) {
		this.projectId = id;
		this.name = name;
		this.rooms = rooms;
	}

	static fromObject({ name, rooms, projectId }) {
		const typedRoomObjects: Room[] = [];
		rooms.forEach(r => {
			typedRoomObjects.push(Room.fromObject(r));
		});
		return new Project(name, typedRoomObjects, projectId);
	}
}
