// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ProjectModel from "../../models/Project";
import Project from "./Project";

describe("<Project />", () => {
	it("should render", () => {
		const project = new ProjectModel("First Project", [], 5234);
		shallow(<Project project={project} />);
	});
});
