// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { MemoryRouter, Route } from "react-router";

import ProjectsContainer from "./ProjectsContainer";

describe("<ProjectsContainer />", () => {
	it("should render", () => {
		shallow(
			<MemoryRouter>
				<Route component={props => <ProjectsContainer {...props} />} />
			</MemoryRouter>
		);
	});
});
