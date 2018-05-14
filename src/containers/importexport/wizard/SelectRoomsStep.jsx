// @flow
import * as React from "react";
import Button from "grommet/components/Button";
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
	selected: ?number | ?(number[])
};

/**
 * This step receives the full list of rooms and when the user clicks next, it has to clean
 * up the rooms and leave only the rooms that were selected inside the return data.
 */
export default class SelectRoomsStep extends React.Component<StepProps, State> {
	state = {
		returnData: this.props.projects,
		selected: null
	};

	listItemProperties = {
		margin: "small",
		pad: "small"
	};

	onNext = () => {
		this.props.onNext(this.state.returnData);
	};

	onSelect = (selected: ?number | number[]) => {
		this.setState({ selected: selected });
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
						<Section pad="none">
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
									onSelect={this.onSelect}
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
