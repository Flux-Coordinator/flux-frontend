// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Paragraph from "grommet/components/Paragraph";
import Button from "grommet/components/Button";

import RoomModel from "../../models/Room";
import MeasurementModel from "../../models/Measurement";
import ReadingModel from "../../models/Reading";
import Transformation from "../../models/Transformation";
import FluxHeatmap from "../../containers/fluxHeatmap/FluxHeatmap";
import type { ConfigObject } from "../../types/Heatmap";
import TransformationForm from "../transformationForm/TransformationForm";
import HeatmapConfigForm from "../heatmapConfigForm/HeatmapConfigForm";
import { EXAMPLE_IMAGE } from "../../images/ImagesBase64";

type Props = {
	room: RoomModel,
	currentMeasurement: MeasurementModel,
	onStartMeasurement: () => void,
	readings: ?(ReadingModel[])
};

type State = {
	transformation: Transformation,
	configObject: ConfigObject
};

export default class MeasurementSummary extends React.Component<Props, State> {
	state = {
		configObject: {
			fixedValue: false,
			radius: 10,
			maxOpacity: 0.5,
			minOpacity: 0,
			blur: 0.75
		},
		transformation: new Transformation()
	};

	handleTransformationChange: () => void;
	handleHeatmapConfigChange: () => void;

	constructor(props: Props) {
		super(props);
		this.handleTransformationChange = this.handleTransformationChange.bind(
			this
		);
		this.handleHeatmapConfigChange = this.handleHeatmapConfigChange.bind(this);
	}

	componentDidMount() {
		this.setState({
			transformation: this.props.room.transformation
		});
	}

	handleTransformationChange = (event: SyntheticEvent<HTMLInputElement>) => {
		if (
			event.currentTarget &&
			event.currentTarget.name &&
			event.currentTarget.value
		) {
			const { name, value } = event.currentTarget;
			this.setState((prevState, props) => ({
				transformation: Object.assign(prevState.transformation, {
					[name]: parseFloat(value)
				})
			}));
		}
	};

	handleHeatmapConfigChange = (event: SyntheticEvent<HTMLInputElement>) => {
		if (
			event.currentTarget &&
			event.currentTarget.name &&
			event.currentTarget.value
		) {
			const { name, value } = event.currentTarget;
			this.setState((prevState, props) => ({
				configObject: Object.assign(prevState.configObject, {
					[name]: parseFloat(value)
				})
			}));
		}
	};

	onTransformationSubmit = () => {
		alert("submit transformation");
	};

	onHeatmapConfigSubmit = () => {
		alert("submit config");
	};

	render() {
		return (
			<Section>
				<Header size="small">
					<Heading tag="h3">Aktuelle Messung</Heading>
				</Header>
				<Box>
					<Header size="small">
						<Heading tag="h3">Grundriss</Heading>
					</Header>
					{this.props.readings && (
						<Box direction="row">
							<FluxHeatmap
								readings={this.props.readings}
								backgroundImage={EXAMPLE_IMAGE}
								transformation={this.state.transformation}
								configObject={this.state.configObject}
							/>
							<Box>
								<TransformationForm
									transformation={this.state.transformation}
									onSubmit={this.onTransformationSubmit}
									onChange={this.handleTransformationChange}
								/>
								<HeatmapConfigForm
									configObject={this.state.configObject}
									onSubmit={this.onHeatmapConfigSubmit}
									onChange={this.handleHeatmapConfigChange}
								/>
							</Box>
						</Box>
					)}
				</Box>
				<Box>
					<Paragraph>
						Messung ID: {this.props.currentMeasurement.measurementId}
					</Paragraph>
					{this.props.readings && (
						<Paragraph>
							Anzahl Messungen: {this.props.readings.length}
						</Paragraph>
					)}
				</Box>
				<Button label="Start/Stopp" onClick={this.props.onStartMeasurement} />
			</Section>
		);
	}
}
