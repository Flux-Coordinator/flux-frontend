// @flow
import * as React from "react";
import axios, { CancelToken, CancelTokenSource } from "axios";
import fileDownload from "js-file-download";

import Project from "./../../models/Project";
import Measurement from "./../../models/Measurement";
import SelectProjectsStep from "./wizard/SelectProjectsStep";
import SelectRoomsStep from "./wizard/SelectRoomsStep";
import SelectMeasurementsStep from "./wizard/SelectMeasurementsStep";

type Props = {};

export type StepProps = {
	onNext: (data: Project[]) => void,
	projects: Project[],
	isLoading?: boolean
};

type State = {
	currentStep: number,
	steps: React.ComponentType<StepProps>[],
	projects: Project[],
	isLoading: boolean
};

export default class ExportWizard extends React.Component<Props, State> {
	source: CancelTokenSource = CancelToken.source();

	state = {
		currentStep: 0,
		steps: [SelectProjectsStep, SelectRoomsStep, SelectMeasurementsStep],
		projects: [],
		isLoading: false
	};

	next = (data: Project[]) => {
		if (this.state.currentStep < this.state.steps.length - 1) {
			this.setState((prevState, props) => {
				return {
					currentStep: prevState.currentStep + 1,
					projects: data
				};
			});
		} else {
			// If it's the last step -> Send the data!
			const rooms = [].concat.apply([], data.map(p => p.rooms));
			const measurements = [].concat.apply([], rooms.map(r => r.measurements));
			const exportBody = measurements.map(m => ({
				measurementId: m.measurementId
			}));
			this.exportData(exportBody);
		}
	};

	exportData = (measurements: { measurementId: number }[]) => {
		axios
			.post("/export", measurements, { cancelToken: this.source.token })
			.then(result => {
				fileDownload(JSON.stringify(result.data), "export.json");
			})
			.catch(error => {
				if (!axios.isCancel(error)) {
					// TODO: What do we want to do if there was an error fetching the projects?
				}
				this.setState({ isLoading: false });
			});
		return;
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
				this.setState({ projects: projs, isLoading: false });
			})
			.catch(error => {
				if (!axios.isCancel(error)) {
					// TODO: What do we want to do if there was an error fetching the projects?
				}
				this.setState({ isLoading: false });
			});
	};

	componentWillUnmount() {
		this.source.cancel();
	}

	componentDidMount() {
		this.fetchProjects();
	}

	render() {
		let Step = this.state.steps[this.state.currentStep];
		return (
			<Step
				projects={this.state.projects}
				onNext={this.next}
				isLoading={this.state.isLoading}
			/>
		);
	}
}
