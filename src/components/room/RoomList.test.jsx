// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ProjectModel from "../../models/Project";
import RoomModel from "../../models/Room";
import RoomList from "./RoomList";

describe("<RoomList />", () => {
	it("should render", () => {
		const room = new RoomModel("First Room", "Description");
		const project = new ProjectModel("Testproject", [room], "asdasd");
		shallow(<RoomList parentProject={project} />);
	});
});
