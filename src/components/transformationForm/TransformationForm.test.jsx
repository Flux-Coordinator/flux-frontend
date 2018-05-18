// @flow
import * as React from "react";
import { shallow } from "enzyme";

import TransformationForm from "./TransformationForm";
import Transformation from "../../models/Transformation";

describe("<TransformationForm />", () => {
	const onSubmit = () => {};
	const onChange = (event: SyntheticEvent<HTMLInputElement>) => {};

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
