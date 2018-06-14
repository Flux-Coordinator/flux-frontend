// @flow
import * as React from "react";
import Heading from "grommet/components/Heading";

import WizardStep from "./WizardStep";
import ItemsList from "./../../../components/list/ItemsList";
import Project from "./../../../models/Project";

import type { StepProps } from "./../../../containers/importexport/ExportWizard";

type State = {
	returnData: Project[],
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
		returnData: this.props.projects,
		selected: null
	};

	subheading: string =
		"Sie können mit CTRL + Mausclick mehrere Projekte auswählen.";

	onNext = () => {
		const selected = this.state.selected;
		let remainingProjects = this.state.returnData;

		if (selected !== "undefined" && selected !== null) {
			if (typeof selected === "number") {
				remainingProjects = [remainingProjects[selected]];
			} else {
				remainingProjects = this.state.returnData.filter(
					(element, index) => (selected ? selected.includes(index) : false)
				);
			}
		}
		this.props.onNext(remainingProjects);
	};

	onSelect = (selected: ?number | number[]) => {
		this.setState({ selected: selected });
	};

	static getDerivedStateFromProps(nextProps: StepProps, prevState: State) {
		return {
			returnData: nextProps.projects
		};
	}

	get isValidState() {
		const { selected } = this.state;
		if (selected != null) {
			if (!Array.isArray(selected)) {
				return true;
			} else {
				return selected.length > 0;
			}
		}
		return false;
	}

	render() {
		return (
			<WizardStep
				heading="Schritt 1: Wählen Sie die Projekte aus"
				subheading={this.subheading}
				onSubmit={this.isValidState ? this.onNext : null}
			>
				<ItemsList
					ItemRenderer={ProjectItemRenderer}
					items={this.props.projects}
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
	return (
		<Heading className="custom-list-anchor" tag="h4">
			{item.name}
		</Heading>
	);
}
