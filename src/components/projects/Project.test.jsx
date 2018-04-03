// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ProjectModel from "../../models/Project";
import Project from "./Project";

describe("<Project />", () => {
	it("should render", () => {
		const project = new ProjectModel("asdodmp", "First Project", []);
		shallow(<Project project={project} />);
	});
});
