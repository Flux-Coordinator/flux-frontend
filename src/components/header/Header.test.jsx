// @flow
import * as React from "react";
import { shallow } from "enzyme";
import Title from "grommet/components/Title";

import Header from "./Header";

describe("<Header />", () => {
	it("should render", () => {
		const wrapper = shallow(<Header />);
		expect(wrapper).toHaveLength(1);
	});

	it("should contain a title", () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.contains(<Title />)).toBe(true);
	});

	it("should contain an anchor to the root page", () => {
		const wrapper = shallow(<Header />);
		const anchor = wrapper.find("Anchor");
		expect(anchor.props().path).toBe("/");
	});
});
