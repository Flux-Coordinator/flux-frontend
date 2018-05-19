// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";
import Accordion from "grommet/components/Accordion";
import AccordionPanel from "grommet/components/AccordionPanel";
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
import HeatmapModeForm from "../heatmapModeForm/HeatmapModeForm";

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

	componentDidMount() {
		this.setState({
			transformation: this.props.room.transformation
		});
	}

	handleTransformationChange = (event: SyntheticEvent<HTMLInputElement>) => {
		if (
			event.currentTarget != null &&
			event.currentTarget.name != null &&
			event.currentTarget.value != null
		) {
			const { name, value } = event.currentTarget;
			this.setState((prevState, props) => ({
				transformation: Object.assign(prevState.transformation, {
					[name]: parseFloat(value)
				})
			}));
		}
	};

	handleModeChange = (event: SyntheticEvent<HTMLInputElement>) => {
		if (
			event.currentTarget != null &&
			event.currentTarget.name != null &&
			event.currentTarget.checked != null
		) {
			const { name, checked } = event.currentTarget;
			this.setState((prevState, props) => ({
				configObject: Object.assign(prevState.configObject, {
					[name]: checked
				})
			}));
		}
	};

	handleHeatmapConfigChange = (event: SyntheticEvent<HTMLInputElement>) => {
		if (
			event.currentTarget != null &&
			event.currentTarget.name != null &&
			event.currentTarget.value != null
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
								<Accordion active={0}>
									<AccordionPanel heading="Transformation">
										<TransformationForm
											transformation={this.state.transformation}
											onSubmit={this.onTransformationSubmit}
											onChange={this.handleTransformationChange}
										/>
									</AccordionPanel>
									<AccordionPanel heading="Heatmap Modi">
										<HeatmapModeForm
											configObject={this.state.configObject}
											onChange={this.handleModeChange}
										/>
									</AccordionPanel>
									<AccordionPanel heading="Konfiguration">
										<HeatmapConfigForm
											configObject={this.state.configObject}
											onSubmit={this.onHeatmapConfigSubmit}
											onChange={this.handleHeatmapConfigChange}
										/>
									</AccordionPanel>
								</Accordion>
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
