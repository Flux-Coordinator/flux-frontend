// @flow
import * as React from "react";
import { shallow } from "enzyme";

import LoginContainer from "./LoginContainer";

describe("<LoginContainer />", () => {
	it("should render", () => {
		shallow(<LoginContainer />);
	});
});
