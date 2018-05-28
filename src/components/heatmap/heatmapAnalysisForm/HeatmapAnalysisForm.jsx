// @flow
import * as React from "react";
import Form from "../../form/Form";
import Box from "grommet/components/Box";
import FormField from "grommet/components/FormField";
import FormFields from "grommet/components/FormFields";
import NumberInput from "grommet/components/NumberInput";
import Value from "grommet/components/Value";
import { inputHandler } from "../../../utils/InputHandler";
import type { AllInputTypes } from "../../../utils/InputHandler";
import HeatmapData from "../../../models/HeatmapData";
import type { HeatmapMode } from "../../../types/Heatmap";

type Props = {
	heatmapData: HeatmapData,
	maxLuxValue: number,
	heatmapMode: HeatmapMode,
	onChange: (string, AllInputTypes) => void
};

type State = {
	numberOfReadings: number,
	average: number,
	min: number,
	max: number,
	uniformity: number,
	irregularity: number
};

export default class HeatmapAnalysisForm extends React.Component<Props, State> {
	state = {
		numberOfReadings: 0,
		average: 0,
		min: 0,
		max: 0,
		uniformity: 0,
		irregularity: 0
	};

	static getDerivedStateFromProps(nextProps: Props, prevState: State) {
		if (
			nextProps.heatmapData.data &&
			nextProps.heatmapData.data.length !== prevState.numberOfReadings &&
			nextProps.heatmapMode === "DEFAULT"
		) {
			if (nextProps.heatmapData.data.length !== 0) {
				return HeatmapAnalysisForm.calculateHeatmapAnalysis(nextProps);
			} else {
				return HeatmapAnalysisForm.getDefaultHeatmapAnalysis();
			}
		}
		return null;
	}

	static calculateHeatmapAnalysis(props: Props): State {
		const dataPoints = props.heatmapData.data;
		const numberOfReadings = dataPoints.length;
		const average =
			dataPoints.reduce((sum, curr) => sum + curr.value, 0) / numberOfReadings;
		const min = dataPoints.reduce(
			(prev, curr) => (curr.value < prev.value ? curr : prev)
		).value;
		const max = dataPoints.reduce(
			(prev, curr) => (curr.value > prev.value ? curr : prev)
		).value;
		const uniformity = min / average;
		const irregularity = min / max;
		return {
			numberOfReadings: numberOfReadings,
			average: Math.round(average),
			min: Math.floor(min),
			max: Math.ceil(max),
			uniformity: Math.round(uniformity * 100) / 100,
			irregularity: Math.round(irregularity * 100) / 100
		};
	}

	static getDefaultHeatmapAnalysis(): State {
		return {
			numberOfReadings: 0,
			average: 0,
			min: 0,
			max: 0,
			uniformity: 0,
			irregularity: 0
		};
	}

	render() {
		return (
			<Form heading="Auswertung">
				<FormFields>
					<fieldset>
						<FormField
							label="Maximale Beleuchtungsstärke einschränken (in Lux)"
							help={"(0 = kein Limit)"}
						>
							<NumberInput
								name={"maxLuxValue"}
								value={this.props.maxLuxValue}
								min={0}
								step={1}
								onChange={inputHandler(this.props.onChange)}
							/>
						</FormField>
						<Box direction={"row"} pad={{ between: "medium" }}>
							<Value
								label={"Anzahl Messungen"}
								value={this.state.numberOfReadings}
								size={"small"}
							/>
							<Value
								label={"Mittelwert Em"}
								value={this.state.average}
								units={"lx"}
								size={"small"}
							/>
							<Value
								label={"Minimalwert Emin"}
								value={this.state.min}
								units={"lx"}
								size={"small"}
							/>
							<Value
								label={"Maximalwert Emax"}
								value={this.state.max}
								units={"lx"}
								size={"small"}
							/>
							<Value
								label={"Gleichmässigkeit Emin/Em"}
								value={this.state.uniformity}
								size={"small"}
							/>
							<Value
								label={"Ungleichmässigkeit Emin/Emax"}
								value={this.state.irregularity}
								size={"small"}
							/>
						</Box>
					</fieldset>
				</FormFields>
			</Form>
		);
	}
}
