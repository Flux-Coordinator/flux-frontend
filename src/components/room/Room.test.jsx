// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { MemoryRouter, Route } from "react-router";

import DataGenerator from "../../utils/DataGenerator";
import Room from "./Room";

describe("<Room />", () => {
	it("should render", () => {
		const project = DataGenerator.createProject(2);
		shallow(
			<MemoryRouter>
				<Route
					component={props => (
						<Room parentProject={project} room={project.rooms[0]} {...props} />
					)}
				/>
			</MemoryRouter>
		);
	});
});
