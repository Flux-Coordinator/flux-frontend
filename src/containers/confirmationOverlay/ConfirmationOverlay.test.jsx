// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ConfirmationOverlay from "./ConfirmationOverlay";

describe("<ConfirmationOverlay />", () => {
	it("should render without optional props", () => {
		shallow(<ConfirmationOverlay>Test</ConfirmationOverlay>);
	});

	it("should render with callback props", () => {
		shallow(
			<ConfirmationOverlay onAccept={() => null} onReject={() => null}>
				Test
			</ConfirmationOverlay>
		);
	});
});
