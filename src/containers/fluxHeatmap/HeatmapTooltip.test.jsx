// @flow
import * as React from "react";
import { shallow } from "enzyme";
import HeatmapTooltip from "./HeatmapTooltip";
import BrowserPosition from "../../models/BrowserPosition";

describe("<HeatmapTooltip />", () => {
	const getValueCallback = (position: BrowserPosition) => position.xposition;
	const heatmapMode = "DEFAULT";

	it("should render", () => {
		const wrapper = shallow(
			<HeatmapTooltip
				heatmapMode={heatmapMode}
				getValueCallback={getValueCallback}
			>
				<p>Test</p>
			</HeatmapTooltip>
		);
		expect(wrapper).toHaveLength(1);
	});
});
