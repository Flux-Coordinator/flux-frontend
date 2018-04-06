// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ErrorBoundary from "./ErrorBoundary";

describe("<ErrorBoundary />", () => {
	it("should render", () => {
		shallow(<ErrorBoundary header="My Header">Content</ErrorBoundary>);
	});
});
