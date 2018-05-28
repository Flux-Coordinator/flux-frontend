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
import type { ConfigObject, HeatmapMode } from "../../types/Heatmap";
import TransformationForm from "../transformationForm/TransformationForm";
import HeatmapConfigForm from "../heatmap/heatmapConfigForm/HeatmapConfigForm";
import HeatmapModeForm from "../heatmap/heatmapModeForm/HeatmapModeForm";
import type { AllInputTypes } from "../../utils/InputHandler";
import Loading from "../loading/Loading";

type Props = {
	room: RoomModel,
	currentMeasurement: MeasurementModel,
	onStartMeasurement: () => void,
	isLoading?: boolean
};

type State = {
	transformation: Transformation,
	configObject: ConfigObject,
	heatmapMode: HeatmapMode
};

export default class MeasurementSummary extends React.Component<Props, State> {
	state = {
		configObject: {
			radius: 1000,
			maxOpacity: 0.5,
			minOpacity: 0,
			blur: 0.75
		},
		transformation: new Transformation(),
		heatmapMode: "DEFAULT"
	};

	static getDerivedStateFromProps(nextProps: Props, prevState: State) {
		prevState.transformation = nextProps.currentMeasurement.transformation;
		return prevState;
	}

	handleValueChange = (key: string, value: AllInputTypes) => {
		this.setState({ [key]: value });
	};

	handleTransformationChange = (key: string, value: AllInputTypes) => {
		this.setState(prevState => ({
			transformation: Object.assign(({}: any), prevState.transformation, {
				[key]: parseFloat(value)
			})
		}));
	};

	handleHeatmapConfigChange = (key: string, value: AllInputTypes) => {
		this.setState(prevState => ({
			configObject: Object.assign({}, prevState.configObject, {
				[key]: parseFloat(value)
			})
		}));
	};

	onTransformationSubmit = () => {
		alert("submit transformation");
	};

	render() {
		if (this.props.isLoading) {
			return <Loading />;
		}

		let icon: React.Node;
		if (this.props.currentMeasurement.measurementState === "RUNNING") {
			icon = <PauseIcon colorIndex="warning" />;
		} else {
			icon = <PlayIcon colorIndex="ok" />;
		}

		return (
			<Section margin="none">
				<Header size="small">
					<Heading margin="none" tag="h3">
						Aktuelle Messung ({this.props.currentMeasurement.name})
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
								anchors={this.props.currentMeasurement.anchors}
								backgroundImage={this.props.room.floorPlan}
								transformation={this.state.transformation}
								configObject={this.state.configObject}
								heatmapMode={this.state.heatmapMode}
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
											heatmapMode={this.state.heatmapMode}
											onChange={this.handleValueChange}
										/>
									</AccordionPanel>
									<AccordionPanel heading="Konfiguration">
										<HeatmapConfigForm
											configObject={this.state.configObject}
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
