// @flow
import * as React from "react";
import Button from "grommet/components/Button";

import WizardStep from "./WizardStep";
import ProjectsList from "./../../../components/projects/ProjectsList";
import Project from "./../../../models/Project";

import type {
	StepProps,
	ExportData
} from "./../../../containers/importexport/ExportWizard";

type State = {
	returnData: ExportData
};

/**
import WizardStep from "./WizardStep";
 * This step receives the full list of projects and when the user clicks next, it has to clean up
 * the list of projects and leave only the projects that were selected in the state.
 */
export default class SelectProjectsStep extends React.Component<
	StepProps,
	State
> {
	state = {
		returnData: this.props.data
	};

	subheading: string = "Sie können mit CTRL + Mausclick mehrere Projekte auswählen.";

	onNext = () => {
		this.props.onNext(this.state.returnData);
	};

	render() {
		return (
			<WizardStep
				heading="Schritt 1: Wählen Sie die Projekte aus"
				subheading={this.subheading}
				onNext={this.onNext}
			>
				<ProjectsList
					ProjectItemRenderer={ProjectItemRenderer}
					projects={this.props.data}
					selectable={"multiple"}
					loading={this.props.isLoading}
				/>
			</WizardStep>
		);
	}
}

function ProjectItemRenderer({ project }: { project: Project }) {
	return project.name;
}
