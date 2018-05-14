// @flow
import * as React from "react";
import Button from "grommet/components/Button";

import WizardStep from "./WizardStep";
import ItemsList from "./../../../components/list/ItemsList";
import Project from "./../../../models/Project";

import type {
	StepProps,
	ExportData
} from "./../../../containers/importexport/ExportWizard";

type State = {
	returnData: ExportData,
	selected: ?number | ?(number[])
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
		returnData: this.props.data,
		selected: null
	};

	subheading: string = "Sie können mit CTRL + Mausclick mehrere Projekte auswählen.";

	onNext = () => {
		const selected = this.state.selected;
		let remainingProjects = this.state.returnData;

		if (selected) {
			if (typeof selected === "number") {
				remainingProjects = remainingProjects[selected];
			} else {
				remainingProjects = this.state.returnData.filter((element, index) =>
					selected.includes(index)
				);
			}
		}
		console.log(remainingProjects);
		this.props.onNext(this.state.returnData);
	};

	onSelect = (selected: ?number | number[]) => {
		this.setState({ selected: selected });
		console.log(selected);
	};

	static getDerivedStateFromProps(nextProps: StepProps, prevState: State) {
		return {
			returnData: nextProps.data,
			selected: null
		};
	}

	render() {
		return (
			<WizardStep
				heading="Schritt 1: Wählen Sie die Projekte aus"
				subheading={this.subheading}
				onNext={this.onNext}
			>
				<ItemsList
					ItemRenderer={ProjectItemRenderer}
					items={this.props.data}
					keyFunc={item => item.projectId}
					selectable={"multiple"}
					onSelect={this.onSelect}
					loading={this.props.isLoading}
				/>
			</WizardStep>
		);
	}
}

function ProjectItemRenderer({ item }: { item: Project }) {
	return item.name;
}
