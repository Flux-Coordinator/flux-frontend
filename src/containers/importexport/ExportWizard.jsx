// @flow
import * as React from "react";
import Button from "grommet/components/Button";
import axios, { CancelToken } from "axios";

import Project from "./../../models/Project";
import Room from "./../../models/Room";
import Measurement from "./../../models/Measurement";
import SelectProjectsStep from "./../../components/importexport/wizard/SelectProjectsStep";
import SelectRoomsStep from "./../../components/importexport/wizard/SelectRoomsStep";
import SelectMeasurementsStep from "./../../components/importexport/wizard/SelectMeasurementsStep";

export type ExportData = {
	projects: Project[],
	rooms: Room[],
	measurements: Measurement[]
};

type Props = {};

type State = {
	currentStep: number,
	steps: React.ComponentType<StepProps>[],
	data: ExportData
};

export type StepProps = {
	onNext: () => void,
	data: ExportData
};

export default class ExportWizard extends React.Component<Props, State> {
	state = {
		currentStep: 0,
		steps: [SelectProjectsStep, SelectRoomsStep, SelectMeasurementsStep],
		data: {
			projects: [],
			rooms: [],
			measurements: []
		}
	};

	next = () => {
		if (this.state.currentStep < this.state.steps.length - 1) {
			this.setState((prevState, props) => {
				return { currentStep: prevState.currentStep + 1 };
			});
		}
	};

	fetchData = () => {
		// TODO:    Fetch the data after next is called. Make this a smart algorithm, that
		//          fetches the data from the available projects. If there are projects,
		//          fetch rooms. If there are rooms, fetch their measurements.
		//          Like this, we avoid having to make complicated callbacks for the steps to fetch data.
	};

	render() {
		let Step = this.state.steps[this.state.currentStep];
		return <Step data={this.state.data} onNext={this.next} />;
	}
}
