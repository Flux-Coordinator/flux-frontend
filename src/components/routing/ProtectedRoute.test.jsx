// @flow
import * as React from "react";
import { MemoryRouter } from "react-router";
import { mount } from "enzyme";

import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./../notfound/NotFound";

describe("ProtectedRoute", () => {
	it("should render", () => {
		mount(
			<MemoryRouter>
				<ProtectedRoute path="/import" component={<NotFound />} />
			</MemoryRouter>
		);
	});
});
