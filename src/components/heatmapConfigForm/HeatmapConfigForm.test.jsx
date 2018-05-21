// @flow
import * as React from "react";
import { shallow } from "enzyme";

import HeatmapConfigForm from "./HeatmapConfigForm";
import type { ConfigObject } from "../../types/Heatmap";
import type { allInputTypes } from "../../utils/InputHandler";

describe("<HeatmapConfigForm />", () => {
	const onSubmit = () => {};
	const onChange = (key: string, value: allInputTypes) => {};
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
