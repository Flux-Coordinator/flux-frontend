// @flow
import Room from "./Room";

type ConstructorType = {
	name: string,
	rooms: Room[],
	projectId: ?string
};

export default class Project {
	projectId: ?string;
	name: string;
	rooms: Room[];

	constructor(name: string, rooms: Room[], projectId: ?string) {
		this.projectId = projectId;
		this.name = name;
		this.rooms = rooms;
	}

	static fromObject({ name, rooms, projectId }: ConstructorType) {
		const typedRoomObjects: Room[] = [];
		rooms.forEach(r => {
			typedRoomObjects.push(Room.fromObject(r));
		});
		return new Project(name, typedRoomObjects, projectId);
	}
}
