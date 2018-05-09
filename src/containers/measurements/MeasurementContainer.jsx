import * as React from "react";
import axios, { CancelToken } from "axios";

import MeasurementSummary from "../../components/measurements/MeasurementSummary";
import ReadingModel from "../../models/Reading";
import MeasurementModel from "../../models/Measurement";

type Props = {
	measurement: MeasurementModel
};

type State = {
	loading: boolean,
	readings: ?(ReadingModel[])
};

export default class MeasurementContainer extends React.Component<
	Props,
	State
> {
	apiUrl: ?string = process.env.REACT_APP_SERVICE_URI;
	source: any = CancelToken.source();

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			this &&
			this.props &&
			this.props.measurement.measurementId ===
				nextProps.measurement.measurementId
		) {
			return null;
		}

		return {
			loading: false,
			readings: []
		};
	}

	state = {
		loading: false,
		readings: []
	};

	getReadings = () => {
		axios
			.get(
				`${this.apiUrl}/measurements/${this.props.measurement.measurementId}`,
				{
					cancelToken: this.source.token
				}
			)
			.then(result => {
				const tmp: ReadingModel[] = result.data.readings.map(
					reading => new ReadingModel(reading)
				);
				this.setState(({ readings: tmp }: State));
			})
			.catch(error => {
				if (!axios.isCancel(error)) {
					this.setState(({ readings: [], loading: false }: State));
				}
			});
	};

	startMeasurement = () => {
		axios
			.put(
				`${this.apiUrl}/measurements/active/${
					this.props.measurement.measurementId
				}`,
				{
					cancelToken: this.source.token
				}
			)
			.then(
				alert("Started measurement " + this.props.measurement.measurementId)
			);
	};

	componentDidMount() {
		this.getReadings();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
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
				currentMeasurement={this.props.measurement}
				onStartMeasurement={this.startMeasurement}
				readings={this.state.readings}
			/>
		);
	}
}