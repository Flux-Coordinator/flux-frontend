// @flow
import * as React from "react";
import Heading from "grommet/components/Heading";
import Section from "grommet/components/Section";
import Article from "grommet/components/Article";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Measurement from "../../models/Measurement";
import RoomModel from "../../models/Room";
import ItemsList from "../list/ItemsList";
import ItemListHeader from "./../list/ItemListHeader";
import MeasurementContainer from "../../containers/measurements/MeasurementContainer";
import AnchorMeasurementItemRenderer from "../measurements/AnchorMeasurementItemRenderer";

type Props = {
	match: any,
	room: RoomModel,
	onDeleteMeasurement: (item: Measurement) => void
};

export default function Room({ match, room, onDeleteMeasurement }: Props) {
	return (
		<Article
			pad={{ horizontal: "medium", vertical: "medium", between: "medium" }}
		>
			<Section pad="none">
				<Heading tag="h2" margin="none" pad="medium">
					{room.name}
				</Heading>
				<Heading tag="h4">{room.description}</Heading>
			</Section>
			<Route
				path={`${match.url}/measurements/:measurementId`}
				component={({ match }) => (
					<MeasurementContainer room={room} match={match} />
				)}
			/>
			<Section pad="none">
				<ItemListHeader
					header="Messungen"
					path={`${match.url}/editMeasurement`}
				/>
				<ItemsList
					items={room.measurements}
					keyFunc={(item: Measurement) => item.measurementId}
					ItemRenderer={({ item }) => (
						<AnchorMeasurementItemRenderer
							item={item}
							match={match}
							onDelete={onDeleteMeasurement}
						/>
					)}
				/>
			</Section>
		</Article>
	);
}

Room.defaultProps = {
	currentMeasurement: null
};
