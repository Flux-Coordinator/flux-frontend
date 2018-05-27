// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Measurement from "./../../models/Measurement";
import Room from "./../../models/Room";
import MeasurementSummary from "./MeasurementSummary";

describe("<MeasurementSummary />", () => {
	it("should render", () => {
		const measurement = new Measurement(
			1,
			"Test measurement",
			"This is the description",
			1650,
			300,
			0.15
		);
		const room = new Room(
			"Test room",
			"Test room",
			([measurement]: Measurement[]),
			"",
			1,
			1
		);
		const wrapper = shallow(
			<MeasurementSummary
				currentMeasurement={measurement}
				room={room}
				onStartMeasurement={() => {}}
			/>
		);
		expect(wrapper).toHaveLength(1);
	});
});
