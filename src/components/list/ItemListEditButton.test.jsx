// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ItemListEditButton from "./ItemListEditButton";

describe("<ItemListEditButton />", () => {
	it("should render", () => {
		shallow(<ItemListEditButton path="" />);
	});
});
