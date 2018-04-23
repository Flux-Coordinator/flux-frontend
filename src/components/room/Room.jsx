// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Article from "grommet/components/Article";

import ProjectModel from "../../models/Project";
import MeasurementModel from "../../models/Measurement";
import RoomModel from "../../models/Room";
import MeasurementList from "../measurements/MeasurementsList";
import MeasurementSummary from "../measurements/MeasurementSummary";
import FloorPlan from "../floorplan/FloorPlan";

type Props = {
	room: RoomModel,
	parentProject: ProjectModel,
	currentMeasurement: ?MeasurementModel
};

export default function Room({
	room,
	parentProject,
	currentMeasurement
}: Props) {
	return (
		<Article pad="medium">
			<Section pad="none">
				<Header justify="between">
					<Heading tag="h2" margin="none" pad="medium">
						{room.name}
					</Heading>
				</Header>
				<Box direction="row" size="full">
					<Box basis="1/2">
						<Header size="small">
							<Heading tag="h4">{room.description}</Heading>
						</Header>
						<div>Name: {room.name ? room.name : "Raum hat keinen Namen"}</div>
						<div>
							Länge: {room.length ? room.length : "Keine Länge vorhanden"}
						</div>
						<div>
							Breite: {room.width ? room.width : "Keine Breite vorhanden"}
						</div>
					</Box>
					<Box basis="1/2">
						<Header size="small">
							<Heading tag="h3">Grundriss</Heading>
						</Header>
						<FloorPlan />
					</Box>
				</Box>
			</Section>
			{currentMeasurement && (
				<MeasurementSummary currentMeasurement={currentMeasurement} />
			)}
			<Section>
				<Header size="small">
					<Heading tag="h3">Messungen</Heading>
				</Header>
				<MeasurementList
					measurements={room.measurements}
					parentProject={parentProject}
					parentRoom={room}
					currentMeasurementId={currentMeasurement}
				/>
			</Section>
		</Article>
	);
}
