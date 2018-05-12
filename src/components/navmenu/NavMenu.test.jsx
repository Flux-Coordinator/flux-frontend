// @flow
import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import Anchor from "grommet/components/Anchor";

import NavMenu from "./NavMenu";

describe("<NavMenu />", () => {
	it("should render", () => {
		mount(
			<MemoryRouter>
				<NavMenu />
			</MemoryRouter>
		);
	});

	it("should have menu entries", () => {
		const wrapper = shallow(<NavMenu />);
		expect(wrapper.find(Anchor).length).toBeGreaterThan(0);
	});
});
