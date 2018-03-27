// @flow
import * as React from "react";
import { shallow } from "enzyme";

import FloorPlan from "./FloorPlan";

describe("<FloorPlan />", () => {
	const placeholderText = "placeholder.png";
	const alternativeText = "Floor Plan";

	it("should render", () => {
		const wrapper = shallow(<FloorPlan />);
		expect(wrapper).toHaveLength(1);
	});

	it("should have a placeholder image when nothing else is provided", () => {
		const wrapper = shallow(<FloorPlan />);
		expect(wrapper.props().src).toBe(placeholderText);
	});

	it("should have a placeholder alt text when nothing else is provided", () => {
		const wrapper = shallow(<FloorPlan />);
		expect(wrapper.props().alt).toBe(alternativeText);
	});
});
