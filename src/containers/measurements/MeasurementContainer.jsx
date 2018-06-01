// @flow
import * as React from "react";
import axios, { CancelToken } from "axios";

import MeasurementSummary from "../../components/measurements/MeasurementSummary";
import ReadingModel from "../../models/Reading";
import RoomModel from "../../models/Room";
import MeasurementModel from "../../models/Measurement";
import { ToastContext } from "./../../components/toast/ToastContext";

import type { ToastMetadata } from "./../../components/toast/Toast";

type Props = {
	room: RoomModel,
	match: any
};

type State = {
	loading: boolean,
	currentMeasurement: MeasurementModel,
	websocket?: WebSocket
};

const KEEP_ALIVE_INTERVAL = 9000;

export default class MeasurementContainer extends React.Component<
	Props,
	State
> {
	source: any = CancelToken.source();
	keepAliveTimer = null;

	state = {
		loading: true,
		currentMeasurement: new MeasurementModel(undefined, "", "", 0, 0)
	};

	fetchMeasurement = () => {
		this.setState({ loading: true });
		const measurementId = this.props.match.params.measurementId;
		if (measurementId != null) {
			axios
				.get(`/measurements/${measurementId}`, {
					cancelToken: this.source.token
				})
				.then(result => {
					const measurement = MeasurementModel.fromObject(result.data);
					this.setState({ currentMeasurement: measurement, loading: false });
				})
				.catch(error => {
					if (!axios.isCancel(error)) {
						this.setState({
							loading: false
						});
					}
				});
		} else {
			alert("Konnte die Messung nicht laden.");
		}
	};

	startMeasurement = () => {
		if (this.state.currentMeasurement.measurementState === "RUNNING") {
			axios
				.delete("/measurements/active", { cancelToken: this.source.token })
				.then(result => {
					this.setState(prevState => {
						const measurement = prevState.currentMeasurement;
						measurement.measurementState = "DONE";
						return {
							currentMeasurement: measurement
						};
					});
				})
				.catch(error => {
					alert(error.response.data);
				});
		} else if (this.state.currentMeasurement.measurementId != null) {
			axios
				.put(
					"/measurements/active/" + this.state.currentMeasurement.measurementId,
					{
						cancelToken: this.source.token
					}
				)
				.then(result => {
					this.setState(prevState => {
						const measurement = prevState.currentMeasurement;
						measurement.measurementState = "RUNNING";
						return {
							currentMeasurement: measurement
						};
					});
				})
				.catch(error => {
					alert(error.response.data);
				});
		} else {
			alert(
				"Es gab einen Fehler. Die Messung konnte nicht gestartet werden (die Messungs ID ist unbekannt)"
			);
		}
	};

	openWebsocket = (url: string) => {
		this.setState(prevState => {
			if (prevState.websocket) {
				prevState.websocket.close();
			}

			if (window.WebSocket) {
				const websocket = new WebSocket(url);
				websocket.onmessage = this.onReadingReceived;

				prevState.websocket = websocket;
				this.keepAliveTimer = setTimeout(this.onKeepAlive, KEEP_ALIVE_INTERVAL);
			}
			return prevState;
		});
	};

	onKeepAlive = () => {
		if (
			this.state.websocket &&
			this.state.websocket.readyState === this.state.websocket.OPEN
		) {
			this.state.websocket.send(0);
		}
		this.keepAliveTimer = setTimeout(this.onKeepAlive, KEEP_ALIVE_INTERVAL);
	};

	closeWebsocket = () => {
		if (this.state.websocket) {
			this.state.websocket.close();
		}

		if (this.keepAliveTimer) {
			clearTimeout(this.keepAliveTimer);
		}
	};

	onReadingReceived = (event: MessageEvent) => {
		this.setState(prevState => {
			const receivedObjects = JSON.parse((event.data: any));
			const newReadings = receivedObjects.map(o => ReadingModel.fromObject(o));
			prevState.currentMeasurement.readings.push(...newReadings);
			return prevState;
		});
	};

	saveMeasurement = (showToast?: (toast: ToastMetadata) => void) => {
		const roomId = this.props.room.roomId;
		const exportMeasurement = this.state.currentMeasurement.toDto();
		axios
			.post(`/rooms/${roomId}/measurements`, exportMeasurement, {
				cancelToken: this.source.token
			})
			.then(result => {
				if (showToast) {
					showToast({
						status: "ok",
						children: "Messung abgespeichert"
					});
				}
			})
			.catch(error => {
				if (showToast) {
					showToast({
						status: "critical",
						children: "Messung konnte nicht gespeichert werden"
					});
				}
			});
	};

	componentDidMount() {
		this.fetchMeasurement();

		let serverUri = process.env.REACT_APP_SERVICE_URI;
		if (serverUri) {
			serverUri = serverUri.replace(/(http)/gi, "ws");
			this.openWebsocket(`${serverUri}/streamMeasurements`);
		}
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (
			this &&
			prevProps &&
			prevState.currentMeasurement.measurementId !==
				this.state.currentMeasurement.measurementId
		) {
			this.fetchMeasurement();
		}
	}

	componentWillUnmount() {
		this.source.cancel();
		this.closeWebsocket();
	}

	render() {
		return (
			<ToastContext.Consumer>
				{(showToast: any) => (
					<MeasurementSummary
						room={this.props.room}
						currentMeasurement={this.state.currentMeasurement}
						onStartMeasurement={this.startMeasurement}
						onSaveMeasurement={() => this.saveMeasurement(showToast)}
						isLoading={this.state.loading}
					/>
				)}
			</ToastContext.Consumer>
		);
	}
}
