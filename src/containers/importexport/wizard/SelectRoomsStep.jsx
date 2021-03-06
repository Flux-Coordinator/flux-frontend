// @flow
import * as React from "react";
import Section from "grommet/components/Section";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";

import WizardStep from "./WizardStep";
import ItemsList from "./../../../components/list/ItemsList";
import Project from "./../../../models/Project";
import Room from "./../../../models/Room";

import type { StepProps } from "./../../../containers/importexport/ExportWizard";

type State = {
	selectedProjects: Project[]
};

/**
 * This step receives the full list of rooms and when the user clicks next, it has to clean
 * up the rooms and leave only the rooms that were selected inside the return data.
 */
export default class SelectRoomsStep extends React.Component<StepProps, State> {
	state = {
		selectedProjects: []
	};

	subheading: string =
		"Sie können mit CTRL + Mausclick mehrere Projekte auswählen.";

	onSelect = (selected: ?number | number[], project: Project) => {
		const foundProject = this.props.projects.find(
			p => p.projectId === project.projectId
		);
		let selectedRooms: Room[];
		const selectedConst = selected;
		if (foundProject) {
			if (typeof selectedConst === "number") {
				selectedRooms = [foundProject.rooms[selectedConst]];
			} else {
				selectedRooms = foundProject.rooms.filter(
					(r, index) => (selectedConst ? selectedConst.includes(index) : false)
				);
			}

			this.setState(prevState => {
				const projectInStateIndex = prevState.selectedProjects.findIndex(
					p => p.projectId === project.projectId
				);
				if (projectInStateIndex > -1) {
					if (selectedRooms.length > 0) {
						prevState.selectedProjects[
							projectInStateIndex
						].rooms = selectedRooms;
					} else {
						prevState.selectedProjects.splice(projectInStateIndex, 1);
					}
				} else {
					const newProjectObject = Project.fromObject(
						Object.assign({}, foundProject)
					);
					newProjectObject.rooms = selectedRooms;
					prevState.selectedProjects.push(newProjectObject);
				}
				return prevState;
			});
		}
	};

	get isValidState() {
		return this.state.selectedProjects.length > 0;
	}

	static getDerivedStateFromProps(nextProps: StepProps, prevState: State) {
		return {
			returnData: nextProps.projects,
			selected: null
		};
	}

	render() {
		const projects = this.props.projects;
		const onSubmit = this.isValidState
			? () => this.props.onNext(this.state.selectedProjects)
			: null;

		return (
			<WizardStep
				heading="Schritt 2: Wählen Sie die Räume aus"
				subheading={this.subheading}
				onSubmit={onSubmit}
			>
				{projects &&
					projects.map(p => (
						<Section pad={{ vertical: "small" }} key={p.projectId}>
							<Heading tag="h4" strong>
								{p.name}
							</Heading>
							<Box>
								<ItemsList
									ItemRenderer={RoomItemRenderer}
									items={p.rooms}
									keyFunc={item => item.roomId}
									selectable={"multiple"}
									onSelect={selected => this.onSelect(selected, p)}
									loading={this.props.isLoading}
								/>
							</Box>
						</Section>
					))}
			</WizardStep>
		);
	}
}

function RoomItemRenderer({ item }: { item: Room }) {
	return (
		<Heading className="custom-list-anchor" tag="h4">
			{item.name}
		</Heading>
	);
}
