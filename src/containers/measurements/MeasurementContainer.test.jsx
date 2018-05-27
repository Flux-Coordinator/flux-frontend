// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Measurement from "./../../models/Measurement";
import Room from "./../../models/Room";
import MeasurementContainer from "./MeasurementContainer";

describe("<MeasurementContainer />", () => {
	it("should render", () => {
		const measurement = new Measurement(
			1,
			"Test Measurement",
			"Test description",
			1650,
			300,
			0.15
		);
		const room = new Room(
			"Test Room",
			"Test Room",
			([measurement]: Measurement[])
		);
		const wrapper = shallow(
			<MeasurementContainer measurement={measurement} room={room} />
		);
		expect(wrapper).toHaveLength(1);
	});
});
