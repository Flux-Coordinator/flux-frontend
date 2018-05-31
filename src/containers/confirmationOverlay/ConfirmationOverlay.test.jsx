// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ConfirmationOverlay from "./ConfirmationOverlay";

describe("<ConfirmationOverlay />", () => {
	it("should render", () => {
		shallow(<ConfirmationOverlay>Test</ConfirmationOverlay>);
	});
});
