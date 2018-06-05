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
	fetchMeasurementTimeout: TimeoutID;
	getSensorTimeout: TimeoutID;

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
				this.updateActiveMeasurement("CONNECTED", activeMeasurement);
				this.resetFetchMeasurementTimeout();
			})
			.catch(error => {
				this.updateActiveMeasurement("DISCONNECTED", undefined);
				this.resetFetchMeasurementTimeout();
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
				} else if (result.status === 204) {
					this.setState({ sensorConnectionState: "DISCONNECTED" });
				}
				this.resetGetSensorTimeout();
			})
			.catch(error => {
				this.setState({ sensorConnectionState: "DISCONNECTED" });
				this.resetGetSensorTimeout();
			});
	};

	updateActiveMeasurement = (
		serverConnection: ConnectionState,
		activeMeasurement?: Measurement
	) => {
		this.setState(prevState => {
			prevState.serverState.connectionState = serverConnection;
			prevState.activeMeasurement = activeMeasurement;

			return prevState;
		});
	};

	resetFetchMeasurementTimeout = (timeoutMilliseconds: number = 3000) => {
		if (!this.isUnmounted) {
			this.fetchMeasurementTimeout = setTimeout(
				this.fetchActiveMeasurement,
				timeoutMilliseconds
			);
		}
	};

	resetGetSensorTimeout = (timeoutMilliseconds: number = 3000) => {
		if (!this.isUnmounted) {
			this.getSensorTimeout = setTimeout(
				this.getSensorActivity,
				timeoutMilliseconds
			);
		}
	};

	componentDidMount() {
		this.fetchActiveMeasurement();
		this.getSensorActivity();
	}

	componentWillUnmount() {
		this.isUnmounted = true;
		if (this.fetchMeasurementTimeout) {
			clearTimeout(this.fetchMeasurementTimeout);
		}
		if (this.getSensorTimeout) {
			clearTimeout(this.getSensorTimeout);
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
