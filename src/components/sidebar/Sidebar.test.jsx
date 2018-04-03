// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Sidebar from "./Sidebar";

describe("<Sidebar />", () => {
	it("should render", () => {
		shallow(<Sidebar header="My Header">Content</Sidebar>);
	});
});
