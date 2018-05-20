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
import type { ConfigObject, HeatmapModes } from "../../types/Heatmap";
import TransformationForm from "../transformationForm/TransformationForm";
import HeatmapConfigForm from "../heatmapConfigForm/HeatmapConfigForm";
import { EXAMPLE_IMAGE } from "../../images/ImagesBase64";
import HeatmapModeForm from "../heatmapModeForm/HeatmapModeForm";
import type { allInputTypes } from "../../utils/InputHandler";

type Props = {
	room: RoomModel,
	currentMeasurement: MeasurementModel,
	onStartMeasurement: () => void,
	readings: ?(ReadingModel[])
};

type State = {
	transformation: Transformation,
	configObject: ConfigObject,
	heatmapModes: HeatmapModes
};

export default class MeasurementSummary extends React.Component<Props, State> {
	state = {
		configObject: {
			radius: 10,
			maxOpacity: 0.5,
			minOpacity: 0,
			blur: 0.75
		},
		transformation: new Transformation(),
		heatmapModes: {
			showCoverage: false,
			showAnchors: false
		}
	};

	componentDidMount() {
		this.setState({
			transformation: this.props.room.transformation
		});
	}

	handleTransformationChange = (key: string, value: allInputTypes) => {
		this.setState((prevState, props) => ({
			transformation: Object.assign(prevState.transformation, {
				[key]: parseFloat(value)
			})
		}));
	};

	handleModeChange = (key: string, value: allInputTypes) => {
		this.setState((prevState, props) => ({
			heatmapModes: Object.assign(prevState.heatmapModes, {
				[key]: value
			})
		}));
	};

	handleHeatmapConfigChange = (key: string, value: allInputTypes) => {
		this.setState((prevState, props) => ({
			configObject: Object.assign(prevState.configObject, {
				[key]: parseFloat(value)
			})
		}));
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
								heatmapModes={this.state.heatmapModes}
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
											heatmapModes={this.state.heatmapModes}
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
