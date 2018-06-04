// @flow
import * as React from "react";
import axios, { CancelToken, CancelTokenSource } from "axios";

import Dashboard from "./../../components/dashboard/Dashboard";
import Measurement from "./../../models/Measurement";

import type { ServerState, ConnectionState } from "./../../types/ServerState";

type Props = {};

type State = {
	serverState: ServerState,
	sensorConnectionState: ConnectionState,
	activeMeasurement: ?Measurement
};

export default class DashboardContainer extends React.Component<Props, State> {
	isUnmounted = false;
	source: CancelTokenSource = CancelToken.source();
	timeout: TimeoutID;

	state = {
		serverState: {
			connectionState: "UNKNOWN",
			uri: axios.defaults.baseURL
		},
		sensorConnectionState: "UNKNOWN",
		activeMeasurement: undefined
	};

	fetchActiveMeasurement = () => {
		axios
			.get("/measurements/active", {
				cancelToken: this.source.token
			})
			.then(result => {
				let activeMeasurement: Measurement;
				if (result.status === 200) {
					activeMeasurement = Measurement.fromObject(result.data);
				}
				this.updateState("CONNECTED", activeMeasurement);
				this.resetFetchTimeout();
			})
			.catch(error => {
				this.updateState("DISCONNECTED", undefined);
				this.resetFetchTimeout();
			});
	};

	updateState = (
		serverConnection: ConnectionState,
		activeMeasurement?: Measurement
	) => {
		this.setState(prevState => {
			prevState.serverState.connectionState = serverConnection;
			prevState.activeMeasurement = activeMeasurement;

			return prevState;
		});
	};

	resetFetchTimeout = (milliseconds: number = 3000) => {
		if (!this.isUnmounted) {
			this.timeout = setTimeout(this.fetchActiveMeasurement, milliseconds);
		}
	};

	componentDidMount() {
		this.fetchActiveMeasurement();
	}

	componentWillUnmount() {
		this.isUnmounted = true;
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		this.source.cancel();
	}

	render() {
		return (
			<Dashboard
				serverState={this.state.serverState}
				sensorConnectionState={this.state.sensorConnectionState}
				activeMeasurement={this.state.activeMeasurement}
			/>
		);
	}
}
