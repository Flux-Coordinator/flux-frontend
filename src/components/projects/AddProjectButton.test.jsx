// @flow
import * as React from "react";
import { shallow } from "enzyme";

import AddProjectButton from "./AddProjectButton";

describe("<AddProjectButton />", () => {
	it("should render", () => {
		shallow(<AddProjectButton />);
	});
});
