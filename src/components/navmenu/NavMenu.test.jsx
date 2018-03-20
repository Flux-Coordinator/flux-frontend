// @flow
import React from "react";
import { mount } from "enzyme";

import NavMenu from "./NavMenu";
import { createShallow } from "material-ui/test-utils";
import Measurement from "../../models/Measurement";
import Project from "../../models/Project";
import Room from "../../models/Room";

function mockMeasurement() {
	return new Measurement("asklmda", "Erste Messung", new Date());
}

function mockRoom(amountOfMeasurements: number = 1) {
	let measurements: Measurement[] = [];

	for (let i = 0; i < amountOfMeasurements; i++) {
		measurements.push(mockMeasurement());
	}

	return new Room("askmld", "MyRoom", measurements);
}

function mockProject(amountOfRooms: number = 1) {
	let rooms: Room[] = [];

	for (let i = 0; i < amountOfRooms; i++) {
		rooms.push(mockRoom());
	}

	return new Project("aslkmd", "My First Project", rooms);
}

describe("<NavMenu />", () => {
	let shallow;

	beforeEach(() => {
		shallow = createShallow();
	});

	it("should render", () => {
		mount(<NavMenu projects={[mockProject()]} />);
	});
});
