// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Export from "./Export";

describe("<Export />", () => {
	it("should render", () => {
		const wrapper = shallow(<Export />);
		expect(wrapper).toHaveLength(1);
	});
});
