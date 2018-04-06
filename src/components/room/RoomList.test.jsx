// @flow
import * as React from "react";
import { shallow } from "enzyme";

import RoomModel from "../../models/Room";
import RoomList from "./RoomList";

describe("<RoomList />", () => {
	it("should render", () => {
		const room = new RoomModel("asdodmp", "First Room", "Description");
		shallow(<RoomList rooms={[room]} />);
	});
});
