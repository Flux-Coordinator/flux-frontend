// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ExportWizard from "./ExportWizard";

describe("<ExportWizard />", () => {
	it("should render", () => {
		const wrapper = shallow(<ExportWizard />);
		expect(wrapper).toHaveLength(1);
	});
});
