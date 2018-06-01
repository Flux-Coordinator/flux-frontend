// @flow
import * as React from "react";
import { shallow } from "enzyme";

import DashboardContainer from "./DashboardContainer";

describe("<DashboardContainer />", () => {
	it("should render", () => {
		const wrapper = shallow(<DashboardContainer />);
		expect(wrapper).toHaveLength(1);
	});
});
