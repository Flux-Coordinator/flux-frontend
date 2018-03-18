// @flow

import React from "react";
import * as renderer from "react-test-renderer";

import NavMenu from "./NavMenu";
import type { Project } from "../../types/Models";

const multipleProjects: Project[] = [
	{
		id: "askmldas",
		name: "MyProject1",
		rooms: []
	}
];

const singleProject: Project = {
	id: "asdnaksdsw",
	name: "MyProject",
	rooms: []
};

it("renders without crashing", () => {
	const tree = renderer
		.create(<NavMenu projects={multipleProjects} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it("renders a project without rooms", () => {});
