// @flow
import * as React from "react";
import { shallow } from "enzyme";
import Title from "grommet/components/Title";

import Form from "./Form";

describe("<Form />", () => {
	it("should render", () => {
		const wrapper = shallow(
			<Form heading="Hi">
				<Title>Header</Title>
			</Form>
		);
		expect(wrapper).toHaveLength(1);
	});
});
