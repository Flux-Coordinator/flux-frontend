// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Dashboard from "./Dashboard";

describe("<Dashboard />", () => {
	it("should render", () => {
		shallow(<Dashboard serverReachable={false} />);
	});
});
