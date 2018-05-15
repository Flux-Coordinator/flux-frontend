// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ImportExportContainer from "./ImportExportContainer";

describe("<ImportExportContainer />", () => {
	it("should render", () => {
		const wrapper = shallow(<ImportExportContainer />);
		expect(wrapper).toHaveLength(1);
	});
});
