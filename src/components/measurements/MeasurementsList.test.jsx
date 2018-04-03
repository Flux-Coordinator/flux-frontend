import * as React from "react";
import { shallow } from "enzyme";

import MeasurementsList from "./MeasurementsList";

describe("<MeasurementsList />", () => {
	it("should render", () => {
		shallow(<MeasurementsList />);
	});
});
