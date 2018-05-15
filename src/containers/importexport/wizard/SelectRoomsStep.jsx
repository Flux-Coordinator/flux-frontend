// @flow
import * as React from "react";
import Section from "grommet/components/Section";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";

import WizardStep from "./WizardStep";
import ItemsList from "./../../../components/list/ItemsList";
import Project from "./../../../models/Project";
import Room from "./../../../models/Room";

import type { StepProps } from "./../../../containers/importexport/ExportWizard";

type State = {
	returnData: Project[],
	selectedProjects: Project[]
	// selected: ?({
	// 	project: Project,
	// 	selected: ?number | ?(number[])
	// }[])
};

/**
 * This step receives the full list of rooms and when the user clicks next, it has to clean
 * up the rooms and leave only the rooms that were selected inside the return data.
 */
export default class SelectRoomsStep extends React.Component<StepProps, State> {
	state = {
		returnData: this.props.projects,
		selectedProjects: []
		// selected: null
	};

	listItemProperties = {
		margin: "small",
		pad: "small"
	};

	onNext = () => {
		// const selects = this.state.selected;
		// let remainingRooms = this.state.returnData;

		// if (selects) {

		// }

		// console.log(selects);

		console.log(this.state.selectedProjects);

		this.props.onNext(this.state.selectedProjects);
	};

	onSelect = (selected: ?number | number[], project: Project) => {
		const foundProject = this.props.projects.find(
			p => p.projectId === project.projectId
		);
		let selectedRooms: Room[];
		if (foundProject) {
			if (typeof selected === "number") {
				selectedRooms = [foundProject.rooms[selected]];
			} else {
				selectedRooms = foundProject.rooms.filter(
					(r, index) => (selected ? selected.includes(index) : false)
				);
			}

			this.setState(prevState => {
				const projectInStateIndex = prevState.selectedProjects.findIndex(
					p => p.projectId === project.projectId
				);
				if (projectInStateIndex > -1) {
					prevState.selectedProjects[projectInStateIndex].rooms = selectedRooms;
				} else {
					foundProject.rooms = selectedRooms;
					prevState.selectedProjects.push(foundProject);
				}
				return prevState;
				// TODO: Remove project from state, if the selected array is empty?
			});
		}

		// const selectedProject = {
		// 	projectId: projectId,
		// 	selected: selected
		// };

		// this.setState(prevState => {
		// 	if (prevState.selected) {
		// 		const oldSelected = prevState.selected.findIndex(
		// 			s => s.projectId === projectId
		// 		);
		// 		if(prevState.selected) {
		// 			prevState.selected[oldSelected] = selectedProject;
		// 		}
		// 		return prevState;
		// 	} else {
		// 		return { selected: [selectedProject] };
		// 	}
		// });
	};

	static getDerivedStateFromProps(nextProps: StepProps, prevState: State) {
		return {
			returnData: nextProps.projects,
			selected: null
		};
	}

	render() {
		const projects = this.props.projects;

		return (
			<WizardStep
				heading="Schritt 2: Wählen Sie die Räume aus"
				onNext={this.onNext}
			>
				{projects &&
					projects.map(p => (
						<Section pad="none" key={p.projectId}>
							<Header margin="none" pad="none" size="small">
								<Heading tag="h4" strong>
									{p.name}
								</Heading>
							</Header>
							<Box>
								<ItemsList
									ItemRenderer={RoomItemRenderer}
									listItemProperties={this.listItemProperties}
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
	return item.name;
}
