// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ProjectModel from "../../models/Project";
import RoomModel from "../../models/Room";
import RoomList from "./RoomList";

describe("<RoomList />", () => {
	it("should render", () => {
		const room = new RoomModel("asdodmp", "First Room", "Description");
		const project = new ProjectModel("123123", "Testproject", [room]);
		shallow(<RoomList parentProject={project} />);
	});
});
