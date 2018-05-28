// @flow
import * as React from "react";
import Paragraph from "grommet/components/Paragraph";
import FormField from "grommet/components/FormField";
import TextInput from "grommet/components/TextInput";
import Loading from "../../components/loading/Loading";
import axios, { CancelToken, CancelTokenSource } from "axios";
import { Redirect } from "react-router-dom";

import Form from "./../../components/form/Form";
import Anchor from "./../../models/Anchor";
import Measurement from "../../models/Measurement";
import AnchorEditFieldset from "./../../components/measurements/edit/AnchorEditFieldset";
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
			"Wahrscheinlich ein Fehler in der Anwendung",
			0,
			0
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
		const anchorPositions = measurement.anchors.map(a =>
			a.toAnchorPositionObject()
		);
		const readingDtos = measurement.readings.map(r => r.toDTO());
		const exportMeasurement: any = Object.assign({}, (measurement: any), {
			anchorPositions: anchorPositions,
			readings: readingDtos,
			...measurement.transformation
		});
		exportMeasurement.anchors = undefined;
		return axios.post(`/rooms/${roomId}/measurements`, exportMeasurement, {
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
			const newMeasurement = new Measurement(undefined, "", "", 0, 0);
			newMeasurement.anchors = [
				new Anchor(0, "6e4e", 0, 0, 0),
				new Anchor(0, "6e5f", 0, 0, 0),
				new Anchor(0, "6e62", 0, 0, 0),
				new Anchor(0, "6964", 0, 0, 0)
			];
			this.setState({
				measurement: newMeasurement,
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

	onAnchorChanged = (index: number, anchor: Anchor) => {
		const { measurement } = this.state;
		measurement.anchors[index] = anchor;
		this.setState({ measurement });
	};

	renderAnchorEditForm = () => {
		const { measurement } = this.state;
		return measurement.anchors.map((a, index) => {
			return (
				<AnchorEditFieldset
					key={index}
					anchorIndex={index}
					anchor={a}
					onAnchorValueChanged={this.onAnchorChanged}
					anchorIdSuggestions={this.state.anchorSuggestions}
				/>
			);
		});
	};

	render() {
		const { match } = this.props;
		if (this.state.shouldRedirect) {
			const { projectId, roomId } = match.params;
			return <Redirect to={`/projects/${projectId}/rooms/${roomId}`} />;
		}

		if (this.state.isLoading) {
			return <Loading />;
		}

		const { measurement } = this.state;

		return (
			<ToastContext.Consumer>
				{(showToast: any) => (
					<Form
						heading="Messung bearbeiten"
						onSubmit={() => this.onSubmit(showToast)}
					>
						<fieldset>
							<Paragraph>Messungsinformationen</Paragraph>
							<FormField label="Name">
								<TextInput
									name="name"
									placeHolder="Namen eingeben"
									value={measurement.name}
									onDOMChange={inputHandler(this.onMeasurementChanged)}
								/>
							</FormField>
							<FormField label="Beschreibung">
								<TextInput
									name="description"
									placeHolder="Beschreibung eingeben"
									value={measurement.description}
									onDOMChange={inputHandler(this.onMeasurementChanged)}
								/>
							</FormField>
							<FormField
								label="Vermesser"
								help="Name der Person, die die Messung durchführt"
							>
								<TextInput
									name="creator"
									placeHolder="Name des Vermessers"
									value={measurement.creator}
									onDOMChange={inputHandler(this.onMeasurementChanged)}
								/>
							</FormField>
						</fieldset>
						{measurement.measurementState === "READY" &&
							this.renderAnchorEditForm()}
					</Form>
				)}
			</ToastContext.Consumer>
		);
	}
}
