// @flow
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";

import Layout from "./Layout";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<MemoryRouter>
			<Layout />
		</MemoryRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
