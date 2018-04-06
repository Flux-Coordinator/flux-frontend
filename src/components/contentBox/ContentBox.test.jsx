// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ContentBox from "./ContentBox";

describe("<ContentBox />", () => {
	it("should render", () => {
		shallow(<ContentBox heading="The Heading">Children</ContentBox>);
	});
});
