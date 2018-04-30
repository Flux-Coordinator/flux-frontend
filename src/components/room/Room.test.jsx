// @flow
import * as React from "react";
import { shallow } from "enzyme";

import DataGenerator from "../../utils/DataGenerator";
import Room from "./Room";

describe("<Room />", () => {
	it("should render", () => {
		const project = DataGenerator.createProject(2);
		shallow(<Room parentProject={project} room={project.rooms[0]} />);
	});
});
