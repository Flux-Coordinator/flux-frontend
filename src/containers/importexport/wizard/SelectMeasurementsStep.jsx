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
	returnData: Project[]
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
		returnData: this.props.projects
	};

	onNext = () => {
		this.props.onNext(this.state.returnData);
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
						// onSelect={selected => this.onSelect(selected, p)}
						loading={this.props.isLoading}
					/>
				</Box>
			</Section>
		));
	};

	render() {
		const projects = this.props.projects;
		console.log(projects);
		return (
			<WizardStep
				heading="Schritt 3: Wählen Sie die Messungen aus"
				onNext={this.onNext}
			>
				{projects && projects.map(p => this.RenderProject(p))}
			</WizardStep>
		);
	}
}

function MeasurementItemRenderer({ item }: { item: Measurement }) {
	return item.description;
}
