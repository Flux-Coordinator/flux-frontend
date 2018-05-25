// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { MemoryRouter, Route } from "react-router";

import EditMeasurement from "./EditMeasurement";

describe("<EditMeasurement />", () => {
	it("should render", () => {
		shallow(
			<MemoryRouter>
				<Route component={props => <EditMeasurement {...props} />} />
			</MemoryRouter>
		);
	});
});
