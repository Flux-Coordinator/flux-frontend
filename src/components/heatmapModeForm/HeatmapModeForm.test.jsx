// @flow
import * as React from "react";
import { shallow } from "enzyme";

import HeatmapModeForm from "./HeatmapModeForm";
import type { AllInputTypes } from "../../utils/InputHandler";
import type { HeatmapMode } from "../../types/Heatmap";

describe("<HeatmapModeForm />", () => {
	const onChange = (key: string, value: AllInputTypes) => {};
	const heatmapMode: HeatmapMode = "DEFAULT";

	it("should render", () => {
		const wrapper = shallow(
			<HeatmapModeForm heatmapMode={heatmapMode} onChange={onChange} />
		);
		expect(wrapper).toHaveLength(1);
	});
});
