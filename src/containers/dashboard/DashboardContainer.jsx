// @flow
import * as React from "react";
import axios, { CancelToken, CancelTokenSource } from "axios";

import Dashboard from "./../../components/dashboard/Dashboard";
import Measurement from "./../../models/Measurement";

type Props = {};

type State = {
	serverReachable: boolean,
	activeMeasurement: Measurement
};

export default class DashboardContainer extends React.PureComponent<
	Props,
	State
> {
	isUnmounted = false;
	source: CancelTokenSource = CancelToken.source();
	timeout: TimeoutID;

	fetchActiveMeasurement = () => {
		axios
			.get("/measurements/active", {
				cancelToken: this.source.token
			})
			.then(result => {
				let activeMeasurement: Measurement;
				if (result.status === 204) {
					activeMeasurement = Measurement.fromObject(result.data);
				}
				this.setState({
					serverReachable: true,
					activeMeasurement
				});
				this.resetFetchTimeout();
			})
			.catch(error => {
				this.setState({
					serverReachable: false,
					activeMeasurement: undefined
				});
				this.resetFetchTimeout();
			});
	};

	resetFetchTimeout = (milliseconds: number = 3000) => {
		if (!this.isUnmounted) {
			this.timeout = setTimeout(this.fetchActiveMeasurement);
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
		return <Dashboard />;
	}
}
