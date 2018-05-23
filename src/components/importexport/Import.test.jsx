// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Import from "./Import";

describe("<Import />", () => {
	it("should render", () => {
		const wrapper = shallow(<Import onUpload={() => {}} />);
		expect(wrapper).toHaveLength(1);
	});
});
