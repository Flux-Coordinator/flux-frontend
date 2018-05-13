// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ProjectsList from "./ProjectsList";
import Project from "../../models/Project";
import AnchorProjectItemRenderer from "./AnchorProjectItemRenderer";

describe("<ProjectsList />", () => {
	it("should render with empty props", () => {
		shallow(
			<ProjectsList
				ProjectItemRenderer={AnchorProjectItemRenderer}
				projects={[]}
			/>
		);
	});

	it("should render without props", () => {
		shallow(<ProjectsList ProjectItemRenderer={AnchorProjectItemRenderer} />);
	});

	it("should render one project", () => {
		const projects = [new Project("Test Project", [], 1254)];

		const wrapper = shallow(
			<ProjectsList
				ProjectItemRenderer={AnchorProjectItemRenderer}
				projects={projects}
			/>
		);
		expect(wrapper.find("ListItem")).toHaveLength(1);
	});

	it("should render multiple projects", () => {
		const projects = [
			new Project("Test Project", [], 12389),
			new Project("Test Project 2", [], 12312)
		];

		const wrapper = shallow(
			<ProjectsList
				ProjectItemRenderer={AnchorProjectItemRenderer}
				projects={projects}
			/>
		);
		expect(wrapper.find("ListItem")).toHaveLength(2);
	});
});
