// @flow
import Project from "../models/Project";
import Room from "../models/Room";
import Measurement from "../models/Measurement";

export default class DataGenerator {
	static getRandomInt = (max: ?number) =>
		Math.floor(Math.random() * Math.floor(max || 1000000000));

	static createMeasurement() {
		return new Measurement(
			DataGenerator.getRandomInt(),
			"Erste Messung",
			new Date(),
			new Date()
		);
	}

	static createRoom(amountOfMeasurements: number = 1) {
		const measurements: Measurement[] = [];

		for (let i = 0; i < amountOfMeasurements; i += 1) {
			measurements.push(DataGenerator.createMeasurement());
		}
		return new Room(
			`Test Room${DataGenerator.getRandomInt()}`,
			"Erster Testraum",
			measurements,
			10,
			20
		);
	}

	static createProject(
		amountOfRooms: number = 1,
		amountOfMeasurementPerRoom: number = 1
	) {
		const rooms: Room[] = [];

		for (let i = 0; i < amountOfRooms; i += 1) {
			rooms.push(DataGenerator.createRoom(amountOfMeasurementPerRoom));
		}

		return new Project("My First Project", rooms, DataGenerator.getRandomInt());
	}

	static createProjects(
		amountOfProjects: number = 1,
		amountOfRoomsPerProject: number = 1,
		amountOfMeasurementsPerRoom: number = 1
	) {
		const projects: Project[] = [];

		for (let i = 0; i < amountOfProjects; i += 1) {
			projects.push(
				DataGenerator.createProject(
					amountOfRoomsPerProject,
					amountOfMeasurementsPerRoom
				)
			);
		}

		return projects;
	}
}
