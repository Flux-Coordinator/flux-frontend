// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Toast from "./Toast";
import type { ToastMetadata } from "./Toast";

describe("<Toast />", () => {
	it("should render", () => {
		shallow(<Toast />);
	});

	it("should render with toast", () => {
		const metadata: ToastMetadata = {
			status: "ok",
			children: "Test"
		};

		shallow(<Toast metadata={metadata} />);
	});
});
