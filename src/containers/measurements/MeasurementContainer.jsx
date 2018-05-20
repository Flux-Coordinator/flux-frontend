// @flow
import * as React from "react";
import axios, { CancelToken } from "axios";

import MeasurementSummary from "../../components/measurements/MeasurementSummary";
import ReadingModel from "../../models/Reading";
import RoomModel from "../../models/Room";
import MeasurementModel from "../../models/Measurement";

type Props = {
	room: RoomModel,
	measurement: MeasurementModel
};

type State = {
	loading: boolean,
	readings?: ReadingModel[],
	currentMeasurement: MeasurementModel
};

export default class MeasurementContainer extends React.Component<
	Props,
	State
> {
	source: any = CancelToken.source();

	state = {
		loading: false,
		currentMeasurement: this.props.measurement
	};

	getReadings = () => {
		axios
			.get(`/measurements/${this.props.measurement.measurementId}`, {
				cancelToken: this.source.token
			})
			.then(result => {
				const typedReadings: ReadingModel[] = result.data.readings.map(
					reading => ReadingModel.fromObject(reading)
				);
				const currentMeasurement = this.state.currentMeasurement;
				currentMeasurement.readings = typedReadings;
				this.setState({ currentMeasurement: currentMeasurement });
			})
			.catch(error => {
				if (!axios.isCancel(error)) {
					this.setState(
						({
							currentMeasurement: this.props.measurement,
							loading: false
						}: State)
					);
				}
			});
	};

	startMeasurement = () => {
		axios
			.put("/measurements/active/" + this.props.measurement.measurementId, {
				cancelToken: this.source.token
			})
			.then(
				alert("Started measurement " + this.props.measurement.measurementId)
			);
	};

	componentDidMount() {
		this.getReadings();
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (
			this &&
			prevProps &&
			prevProps.measurement.measurementId !==
				this.props.measurement.measurementId
		) {
			this.getReadings();
		}
	}

	render() {
		return (
			<MeasurementSummary
				room={this.props.room}
				currentMeasurement={this.state.currentMeasurement}
				onStartMeasurement={this.startMeasurement}
			/>
		);
	}
}
