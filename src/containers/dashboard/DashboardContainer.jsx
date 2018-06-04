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
	interval: IntervalID;

	state = {
		serverState: {
			connectionState: "UNKNOWN",
			uri: axios.defaults.baseURL
		},
		sensorConnectionState: "UNKNOWN",
		activeMeasurement: undefined
	};

	onUpdate = () => {
		this.fetchActiveMeasurement();
		this.getSensorActivity();
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
			})
			.catch(error => {
				this.updateState("DISCONNECTED", undefined);
			});
	};

	getSensorActivity = () => {
		axios
			.get("/sensors", {
				cancelToken: this.source.token
			})
			.then(result => {
				if (result.status === 200) {
					this.setState({ sensorConnectionState: "CONNECTED" });
				}
			})
			.catch(error => {
				this.setState({ sensorConnectionState: "DISCONNECTED" });
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

	setInterval = (timeoutMilliseconds: number = 3000) => {
		if (!this.isUnmounted) {
			this.interval = setInterval(this.onUpdate, timeoutMilliseconds);
		}
	};

	componentDidMount() {
		this.setInterval();
	}

	componentWillUnmount() {
		this.isUnmounted = true;
		if (this.interval) {
			clearInterval(this.interval);
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
