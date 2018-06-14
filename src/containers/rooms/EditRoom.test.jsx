// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { MemoryRouter, Route } from "react-router";

import EditRoom from "./EditRoom";

describe("<EditRoom />", () => {
	it("should render", () => {
		shallow(
			<MemoryRouter>
				<Route component={props => <EditRoom {...props} />} />
			</MemoryRouter>
		);
	});
});
