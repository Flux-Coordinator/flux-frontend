// @flow
import React from "react";
import { mount } from "enzyme";

import NavMenu from "./NavMenu";
import Measurement from "../../models/Measurement";
import Project from "../../models/Project";
import Room from "../../models/Room";
import { MemoryRouter } from "react-router";

function mockMeasurement() {
	return new Measurement("asklmda", "Erste Messung", new Date());
}

function mockRoom(amountOfMeasurements: number = 1) {
	const measurements: Measurement[] = [];

	for (let i = 0; i < amountOfMeasurements; i += 1) {
		measurements.push(mockMeasurement());
	}

	return new Room("askmld", "MyRoom", "Test Room", measurements);
}

function mockProject(amountOfRooms: number = 1) {
	const rooms: Room[] = [];

	for (let i = 0; i < amountOfRooms; i += 1) {
		rooms.push(mockRoom());
	}

	return new Project("aslkmd", "My First Project", rooms);
}

describe("<NavMenu />", () => {
	it("should render", () => {
		mount(
			<MemoryRouter>
				<NavMenu onNavigate={() => {}} />
			</MemoryRouter>
		);
	});
});
