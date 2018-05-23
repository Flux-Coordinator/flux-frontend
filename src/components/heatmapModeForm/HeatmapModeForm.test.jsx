// @flow
import * as React from "react";
import { shallow } from "enzyme";

import HeatmapModeForm from "./HeatmapModeForm";
import type { HeatmapModes } from "../../types/Heatmap";
import type { AllInputTypes } from "../../utils/InputHandler";

describe("<HeatmapModeForm />", () => {
	const onChange = (key: string, value: AllInputTypes) => {};
	const heatmapModes: HeatmapModes = {
		showCoverage: false,
		showAnchors: false
	};

	it("should render", () => {
		const wrapper = shallow(
			<HeatmapModeForm heatmapModes={heatmapModes} onChange={onChange} />
		);
		expect(wrapper).toHaveLength(1);
	});
});
