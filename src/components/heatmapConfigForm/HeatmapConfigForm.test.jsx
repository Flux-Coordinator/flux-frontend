// @flow
import * as React from "react";
import { shallow } from "enzyme";

import HeatmapConfigForm from "./HeatmapConfigForm";
import type { ConfigObject } from "../../types/Heatmap";

describe("<HeatmapConfigForm />", () => {
	const onSubmit = () => {};
	const onChange = (event: SyntheticEvent<HTMLInputElement>) => {};
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
