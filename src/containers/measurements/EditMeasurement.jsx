// @flow
import * as React from "react";
import FormField from "grommet/components/FormField";
import TextInput from "grommet/components/TextInput";
import Loading from "../../components/loading/Loading";
import axios, { CancelToken, CancelTokenSource } from "axios";
import { Redirect } from "react-router-dom";

import Form from "./../../components/form/Form";
import Measurement from "../../models/Measurement";
import { ToastContext } from "./../../components/toast/ToastContext";
import { inputHandler } from "../../utils/InputHandler";

import type { AllInputTypes } from "../../utils/InputHandler";
import type { ToastMetadata } from "./../../components/toast/Toast";

type Props = {
	match: any
};

type State = {
	measurement: Measurement,
	isLoading: boolean,
	shouldRedirect: boolean,
	toast?: ToastMetadata
};

export default class EditMeasurement extends React.Component<Props, State> {
	source: CancelTokenSource = CancelToken.source();
	state = {
		measurement: new Measurement(
			undefined,
			"Nicht initialisierte Messung",
			new Date(),
			new Date(),
			"READY"
		),
		isLoading: true,
		shouldRedirect: false
	};

	fetchMeasurement = (measurementId: number) => {
		return axios.get("/measurements/" + measurementId, {
			cancelToken: this.source.token
		});
	};

	saveMeasurement = (measurement: Measurement) => {
		const { roomId } = this.props.match.params;
		return axios.post(`/rooms/${roomId}/measurements`, measurement, {
			cancelToken: this.source.token
		});
	};

	onSubmit = (showToast?: (toast: ToastMetadata) => void) => {
		this.setState({ isLoading: true });
		this.saveMeasurement(this.state.measurement)
			.then(result => {
				if (result.status === 201) {
					if (showToast) {
						showToast({
							status: "ok",
							children: "Messung abgespeichert"
						});
					}
					this.setState({ shouldRedirect: true });
				}
			})
			.catch(error => {
				this.setState({ isLoading: false });
				if (showToast) {
					showToast({
						status: "critical",
						children: "Messung konnte nicht gespeichert werden"
					});
				}
			});
	};

	onMeasurementChanged = (key: string, value: AllInputTypes) => {
		this.setState((prevState, props) => {
			prevState.measurement = Object.assign(prevState.measurement, {
				[key]: value
			});
			return prevState;
		});
	};

	componentDidMount() {
		const { measurementId } = this.props.match.params;

		if (typeof measurementId === "undefined") {
			this.setState({
				measurement: new Measurement(
					undefined,
					"",
					new Date(),
					new Date(),
					"READY"
				),
				isLoading: false
			});
		} else {
			this.fetchMeasurement(measurementId).then(result => {
				const measurement = Measurement.fromObject(result.data);
				this.setState({
					measurement: measurement,
					isLoading: false
				});
			});
		}
	}

	render() {
		const { match } = this.props;
		if (this.state.shouldRedirect) {
			const { projectId, roomId } = match.params;
			return <Redirect to={`/projects/${projectId}/rooms/${roomId}`} />;
		}

		if (this.state.isLoading) {
			return <Loading />;
		}

		return (
			<ToastContext.Consumer>
				{(showToast: any) => (
					<Form
						heading="Messung bearbeiten"
						onSubmit={() => this.onSubmit(showToast)}
					>
						<FormField label="Beschreibung">
							<TextInput
								name="description"
								placeholder="Projektname eingeben"
								value={this.state.measurement.description}
								onDOMChange={inputHandler(this.onMeasurementChanged)}
							/>
						</FormField>
					</Form>
				)}
			</ToastContext.Consumer>
		);
	}
}
