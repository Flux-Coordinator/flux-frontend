// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Article from "grommet/components/Article";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProjectModel from "../../models/Project";
import Measurement from "../../models/Measurement";
import RoomModel from "../../models/Room";
import ItemsList from "../list/ItemsList";
import MeasurementContainer from "../../containers/measurements/MeasurementContainer";
import FloorPlan from "../floorplan/FloorPlan";
import AnchorMeasurementItemRenderer from "../measurements/AnchorMeasurementItemRenderer";

type Props = {
	match: any,
	room: RoomModel,
	parentProject: ProjectModel
};

export default function Room({ match, room, parentProject }: Props) {
	console.log(match);
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
			<Route
				path={`${match.url}/measurements/:measurementId`}
				component={({ match }) => {
					return ShowMeasurement({ room, match });
				}}
			/>
			<Section>
				<Header size="small">
					<Heading tag="h3">Messungen</Heading>
				</Header>
				<ItemsList
					items={room.measurements}
					keyFunc={(item: Measurement) => item.measurementId}
					ItemRenderer={({ item }) =>
						AnchorMeasurementItemRenderer({ item, match })
					}
				/>
			</Section>
		</Article>
	);
}

function ShowMeasurement({ room, match }) {
	let currentMeasurement: ?Measurement = null;
	if (match.params.measurementId) {
		currentMeasurement = room.measurements.find(
			measurement =>
				measurement.measurementId === parseInt(match.params.measurementId, 10)
		);
		return <MeasurementContainer measurement={currentMeasurement} />;
	}
	return null;
}

Room.defaultProps = {
	currentMeasurement: null
};
