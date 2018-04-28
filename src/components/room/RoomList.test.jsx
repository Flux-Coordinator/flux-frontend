// @flow
import * as React from "react";
import { shallow } from "enzyme";

import DataGenerator from "../../utils/DataGenerator";
import RoomList from "./RoomList";

describe("<RoomList />", () => {
	it("should render", () => {
		const project = DataGenerator.createProject(1);
		shallow(<RoomList parentProject={project} />);
	});
});
