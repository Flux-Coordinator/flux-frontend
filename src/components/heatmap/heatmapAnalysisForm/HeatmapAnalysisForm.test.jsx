// @flow
import * as React from "react";
import { shallow } from "enzyme";
import HeatmapAnalysisForm from "./HeatmapAnalysisForm";
import type { AllInputTypes } from "../../../utils/InputHandler";
import HeatmapData from "../../../models/HeatmapData";

describe("<HeatmapAnalysisForm />", () => {
	const onChange = (key: string, value: AllInputTypes) => {};
	const heatmapData = new HeatmapData(0, 1000, []);
	const maxLuxValue = 0;
	const heatmapMode = "DEFAULT";

	it("should render", () => {
		const wrapper = shallow(
			<HeatmapAnalysisForm
				onChange={onChange}
				heatmapData={heatmapData}
				maxLuxValue={maxLuxValue}
				heatmapMode={heatmapMode}
				includeFilteredValues={true}
			/>
		);
		expect(wrapper).toHaveLength(1);
	});
});
