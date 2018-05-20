// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";
import Accordion from "grommet/components/Accordion";
import AccordionPanel from "grommet/components/AccordionPanel";
import Section from "grommet/components/Section";
import Button from "grommet/components/Button";
import PlayIcon from "grommet/components/icons/base/Play";
import PauseIcon from "grommet/components/icons/base/Pause";

import RoomModel from "../../models/Room";
import MeasurementModel from "../../models/Measurement";
import Transformation from "../../models/Transformation";
import FluxHeatmap from "../../containers/fluxHeatmap/FluxHeatmap";
import type { ConfigObject } from "../../types/Heatmap";
import TransformationForm from "../transformationForm/TransformationForm";
import HeatmapConfigForm from "../heatmapConfigForm/HeatmapConfigForm";
import { EXAMPLE_IMAGE } from "../../images/ImagesBase64";
import HeatmapModeForm from "../heatmapModeForm/HeatmapModeForm";
import type { allInputTypes } from "../../utils/InputHandler";

type Props = {
	room: RoomModel,
	currentMeasurement: MeasurementModel,
	onStartMeasurement: () => void
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

	handleTransformationChange = (key: string, value: allInputTypes) => {
		this.setState((prevState, props) => ({
			transformation: Object.assign(prevState.transformation, {
				[key]: parseFloat(value)
			})
		}));
	};

	handleModeChange = (key: string, value: allInputTypes) => {
		this.setState((prevState, props) => ({
			configObject: Object.assign(prevState.configObject, {
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
		let icon: React.Node;
		if (this.props.currentMeasurement.state === "RUNNING") {
			icon = <PauseIcon colorIndex="warning" />;
		} else {
			icon = <PlayIcon colorIndex="ok" />;
		}

		return (
			<Section margin="none">
				<Header size="small">
					<Heading margin="none" tag="h3">
						Aktuelle Messung ({this.props.currentMeasurement.measurementId})
					</Heading>
					<Button icon={icon} onClick={this.props.onStartMeasurement} />
				</Header>
				<Box>
					<Header size="small">
						<Heading tag="h3">Grundriss</Heading>
					</Header>
					{this.props.currentMeasurement.readings && (
						<Box direction="row">
							<FluxHeatmap
								readings={this.props.currentMeasurement.readings}
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
			</Section>
		);
	}
}
