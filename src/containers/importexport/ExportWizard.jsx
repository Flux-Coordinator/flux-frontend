// @flow
import * as React from "react";
import Button from "grommet/components/Button";
import axios, { CancelToken, CancelTokenSource } from "axios";

import Project from "./../../models/Project";
import Room from "./../../models/Room";
import Measurement from "./../../models/Measurement";
import SelectProjectsStep from "./wizard/SelectProjectsStep";
import SelectRoomsStep from "./wizard/SelectRoomsStep";
import SelectMeasurementsStep from "./wizard/SelectMeasurementsStep";

export type ExportData = {
	projects: Project[],
	rooms: Room[],
	measurements: Measurement[]
};

type Props = {};

type State = {
	currentStep: number,
	steps: React.ComponentType<StepProps>[],
	data: ExportData,
	isLoading: boolean
};

export type StepProps = {
	onNext: (data: ExportData) => void,
	data: ExportData
};

export default class ExportWizard extends React.Component<Props, State> {
	source: CancelTokenSource = CancelToken.source();

	state = {
		currentStep: 0,
		steps: [SelectProjectsStep, SelectRoomsStep, SelectMeasurementsStep],
		data: {
			projects: [],
			rooms: [],
			measurements: []
		},
		isLoading: false
	};

	next = (data: ExportData) => {
		if (this.state.currentStep < this.state.steps.length - 1) {
			this.setState((prevState, props) => {
				return { currentStep: prevState.currentStep + 1 };
			});
		}
	};

	fetchProjects = () => {
		this.setState({ isLoading: true });
		axios
			.get("/projects?limit=0", { cancelToken: this.source.token })
			.then(result => {
				const projs: Project[] = [];
				result.data.forEach(d => {
					projs.push(Project.fromObject(d));
				});

				this.setState((prevState, props) => {
					const data = prevState.data;
					data.projects = projs;
					return { data, isLoading: false };
				});
			})
			.catch(error => {
				if (!axios.isCancel(error)) {
					// TODO: What do we want to do if there was an error fetching the projects?
				}
				this.setState({ isLoading: false });
				console.log(error);
			});
	};

	fetchSmart = () => {
		// TODO:    Fetch the data after next is called. Make this a smart algorithm, that
		//          fetches the data from the available projects. If there are projects,
		//          fetch rooms. If there are rooms, fetch their measurements.
		//          Like this, we avoid having to make complicated callbacks for the steps to fetch data.
	};

	componentWillUnmount() {
		this.source.cancel();
	}

	render() {
		let Step = this.state.steps[this.state.currentStep];
		return <Step data={this.state.data} onNext={this.next} />;
	}
}
