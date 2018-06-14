// @flow
import * as React from "react";
import { shallow } from "enzyme";

import Dashboard from "./Dashboard";

import type { ServerState } from "./../../types/ServerState";
import type { ConnectionState } from "./../../types/ServerState";

describe("<Dashboard />", () => {
	it("should render", () => {
		const serverState: ServerState = {
			connectionState: "UNKNOWN"
		};
		const sensorState: ConnectionState = "UNKNOWN";
		shallow(
			<Dashboard
				serverState={serverState}
				sensorConnectionState={sensorState}
			/>
		);
	});
});
