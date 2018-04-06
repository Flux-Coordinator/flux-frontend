// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ProjectsList from "./ProjectsList";
import Project from "../../models/Project";

describe("<ProjectsList />", () => {
	it("should render with empty props", () => {
		shallow(<ProjectsList projects={[]} />);
	});

	it("should render without props", () => {
		shallow(<ProjectsList />);
	});

	it("should render one project", () => {
		const projects = [new Project("12345123", "Test Project", [])];

		const wrapper = shallow(<ProjectsList projects={projects} />);
		expect(wrapper.find("ListItem")).toHaveLength(1);
	});

	it("should render multiple projects", () => {
		const projects = [
			new Project("12345123", "Test Project", []),
			new Project("4h5gwefs", "Test Project 2", [])
		];

		const wrapper = shallow(<ProjectsList projects={projects} />);
		expect(wrapper.find("ListItem")).toHaveLength(2);
	});
});
