// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ItemListDeleteButton from "./ItemListDeleteButton";

describe("<ItemListDeleteButton />", () => {
	it("should render", () => {
		shallow(<ItemListDeleteButton path="" />);
	});
});
