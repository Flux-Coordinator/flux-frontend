// @flow
import * as React from "react";
import { shallow } from "enzyme";

import HeatmapModeForm from "./HeatmapModeForm";
import type { ConfigObject } from "../../types/Heatmap";
import type { allInputTypes } from "../../utils/InputHandler";

describe("<HeatmapModeForm />", () => {
	const onChange = (key: string, value: allInputTypes) => {};
	const configObject: ConfigObject = {};

	it("should render", () => {
		const wrapper = shallow(
			<HeatmapModeForm configObject={configObject} onChange={onChange} />
		);
		expect(wrapper).toHaveLength(1);
	});
});
