// @flow
import * as React from "react";
import { shallow } from "enzyme";

import HeatmapConfigForm from "./HeatmapConfigForm";
import type { ConfigObject } from "../../types/Heatmap";
import type { AllInputTypes } from "../../utils/InputHandler";

describe("<HeatmapConfigForm />", () => {
	const onSubmit = () => {};
	const onChange = (key: string, value: AllInputTypes) => {};
	const configObject: ConfigObject = {};

	it("should render", () => {
		const wrapper = shallow(
			<HeatmapConfigForm
				configObject={configObject}
				onSubmit={onSubmit}
				onChange={onChange}
			/>
		);
		expect(wrapper).toHaveLength(1);
	});
});
