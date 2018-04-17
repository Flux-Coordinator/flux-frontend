// @flow
import * as React from "react";
import { shallow } from "enzyme";

import RoomModel from "../../models/Room";
import Room from "./Room";

describe("<Room />", () => {
	it("should render", () => {
		const room = new RoomModel("First Room", "Description");
		shallow(<Room room={room} />);
	});
});
