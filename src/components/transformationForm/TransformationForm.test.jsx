// @flow
import * as React from "react";
import { shallow } from "enzyme";

import TransformationForm from "./TransformationForm";
import Transformation from "../../models/Transformation";
import type { AllInputTypes } from "../../utils/InputHandler";

describe("<TransformationForm />", () => {
	const onSubmit = () => {};
	const onChange = (key: string, value: AllInputTypes) => {};

	it("should render", () => {
		const wrapper = shallow(
			<TransformationForm
				transformation={new Transformation()}
				onSubmit={onSubmit}
				onChange={onChange}
			/>
		);
		expect(wrapper).toHaveLength(1);
	});
});
