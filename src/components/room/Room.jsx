// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Section from "grommet/components/Section";
import Article from "grommet/components/Article";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProjectModel from "../../models/Project";
import Measurement from "../../models/Measurement";
import RoomModel from "../../models/Room";
import ItemsList from "../list/ItemsList";
import MeasurementContainer from "../../containers/measurements/MeasurementContainer";
import AnchorMeasurementItemRenderer from "../measurements/AnchorMeasurementItemRenderer";

type Props = {
	match: any,
	room: RoomModel,
	parentProject: ProjectModel
};

export default function Room({ match, room, parentProject }: Props) {
	return (
		<Article pad="medium">
			<Section pad="none">
				<Heading tag="h2" margin="none" pad="medium">
					{room.name}
				</Heading>
				<Heading tag="h4">{room.description}</Heading>
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
		return (
			<MeasurementContainer measurement={currentMeasurement} room={room} />
		);
	}
	return null;
}

Room.defaultProps = {
	currentMeasurement: null
};
