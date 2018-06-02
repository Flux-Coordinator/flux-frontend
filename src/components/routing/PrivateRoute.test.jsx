// @flow
import * as React from "react";
import { MemoryRouter } from "react-router";
import { mount } from "enzyme";

import PrivateRoute from "./PrivateRoute";
import NotFound from "./../notfound/NotFound";

describe("<PrivateRoute />", () => {
	it("should render", () => {
		mount(
			<MemoryRouter>
				<PrivateRoute path="/import" component={<NotFound />} />
			</MemoryRouter>
		);
	});
});
