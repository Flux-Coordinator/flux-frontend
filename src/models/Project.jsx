// @flow
import Room from "./Room";

type ConstructorType = {
	name: string,
	rooms: Room[],
	projectId: ?number
};

export default class Project {
	projectId: ?number;
	name: string;
	rooms: Room[];

	constructor(name: string, rooms: Room[], projectId: ?number) {
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
