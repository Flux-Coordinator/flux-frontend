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
import Measurement from "./../../../models/Measurement";

import type { StepProps } from "./../../../containers/importexport/ExportWizard";

type State = {
	returnData: Project[],
	projects: Project[]
};

/**
 * This step receives the full list of measurements and when the user clicks next, it has to clean
 * up the measurements and leave only the measurements that were selected inside the return data.
 */
export default class SelectMeasurementsStep extends React.Component<
	StepProps,
	State
> {
	state = {
		returnData: this.props.projects,
		projects: []
	};

	getMeasurementsOfRoom = (
		data: Project[],
		projectId: ?number,
		roomId: ?number
	) => {
		const foundProjectInProps = data.find(p => p.projectId === projectId);
		const foundRoomInProps = foundProjectInProps
			? foundProjectInProps.rooms.find(r => r.roomId === roomId)
			: null;

		return foundRoomInProps ? foundRoomInProps.measurements : null;
	};

	onSelect = (selected: number | number[], project: Project, room: Room) => {
		this.setState(prevState => {
			const foundProjectInState = prevState.projects.find(
				p => p.projectId === project.projectId
			);
			const foundRoomInState = foundProjectInState
				? foundProjectInState.rooms.find(r => r.roomId === room.roomId)
				: null;

			const allMeasurements = this.getMeasurementsOfRoom(
				this.props.projects,
				project.projectId,
				room.roomId
			);
			const selectedMeasurements = getItemsFromArrayByIndex(
				allMeasurements,
				selected
			);

			if (foundRoomInState) {
				foundRoomInState.measurements = (selectedMeasurements: any);
			} else {
				let projectInState: Project;
				if (!foundProjectInState) {
					projectInState = Project.fromObject(Object.assign({}, project));
					projectInState.rooms = [];
					prevState.projects.push(projectInState);
				} else {
					projectInState = foundProjectInState;
				}

				const newRoomForState = Room.fromObject(Object.assign({}, room));

				newRoomForState.measurements = (selectedMeasurements: any);
				projectInState.rooms.push(newRoomForState);
			}

			return prevState;
		});
	};

	RenderProject = (project: Project) => {
		return project.rooms.map(r => (
			<Section pad="none" key={r.roomId}>
				<Header margin="none" pad="none" size="small">
					<Heading tag="h4" strong>
						{r.name}
					</Heading>
				</Header>
				<Box>
					<ItemsList
						ItemRenderer={MeasurementItemRenderer}
						items={r.measurements}
						keyFunc={item => item.measurementId}
						selectable={"multiple"}
						onSelect={selected => this.onSelect(selected, project, r)}
						loading={this.props.isLoading}
					/>
				</Box>
			</Section>
		));
	};

	render() {
		const projects = this.props.projects;
		return (
			<WizardStep
				heading="Schritt 3: Wählen Sie die Messungen aus"
				onNext={() => this.props.onNext(this.state.projects)}
			>
				{projects && projects.map(p => this.RenderProject(p))}
			</WizardStep>
		);
	}
}

function MeasurementItemRenderer({ item }: { item: Measurement }) {
	return <div className="custom-list-anchor">{item.description}</div>;
}

function getItemsFromArrayByIndex<T>(
	array: ?Array<T>,
	indexes: number[] | number
) {
	if (!array) return [];

	if (typeof indexes === "number") {
		return [array[indexes]];
	} else {
		return array.filter((item, index) => (indexes: any).includes(index));
	}
}
