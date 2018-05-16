// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Loading from "./Loading";

describe("<Loading />", () => {
	it("should render", () => {
		shallow(<Loading />);
	});
});
