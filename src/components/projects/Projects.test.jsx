import * as React from "react";

import { mount } from "enzyme";
import Projects from "./Projects";

describe("<Projects />", () => {
	it("should render", () => {
		mount(<Projects />);
	});
});
