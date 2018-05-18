// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { MemoryRouter, Route } from "react-router";

import EditProject from "./EditProject";

describe("<EditProject />", () => {
	it("should render", () => {
		shallow(
			<MemoryRouter>
				<Route component={props => <EditProject {...props} />} />
			</MemoryRouter>
		);
	});
});
