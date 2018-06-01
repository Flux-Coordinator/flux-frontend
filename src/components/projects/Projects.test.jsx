// @flow
import * as React from "react";
import { MemoryRouter } from "react-router";

import { mount } from "enzyme";
import Projects from "./Projects";
import DataGenerator from "../../utils/DataGenerator";

describe("<Projects />", () => {
	it("should render", () => {
		mount(
			<MemoryRouter>
				<Projects
					loading={false}
					projects={DataGenerator.createProjects(10)}
					onDelete={() => {}}
				/>
			</MemoryRouter>
		);
	});
});
