// @flow
import * as React from "react";
import { shallow, mount } from "enzyme";

import FloorPlan from "./FloorPlan";

describe("<FloorPlan />", () => {
	it("should render", () => {
		const wrapper = shallow(<FloorPlan />);
		expect(wrapper).toHaveLength(1);
	});

	it("should have a placeholder when nothing else is provided", () => {
		const wrapper = shallow(<FloorPlan />);
		expect(wrapper.props().src).toBe("placeholder.png");
	});
});
