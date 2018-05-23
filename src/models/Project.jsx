// @flow
import Room from "./Room";

type ConstructorType = {
	name: string,
	description: string,
	rooms: Room[],
	projectId: ?number
};

export default class Project {
	projectId: ?number;
	name: string;
	description: string;
	rooms: Room[];

	constructor(
		name: string,
		description: string,
		rooms: Room[],
		projectId: ?number
	) {
		this.projectId = projectId;
		this.name = name;
		this.description = description;
		this.rooms = rooms;
	}

	static fromObject({ name, description, rooms, projectId }: ConstructorType) {
		const typedRoomObjects: Room[] = [];
		rooms.forEach(r => {
			typedRoomObjects.push(Room.fromObject(r));
		});
		return new Project(name, description, typedRoomObjects, projectId);
	}
}
