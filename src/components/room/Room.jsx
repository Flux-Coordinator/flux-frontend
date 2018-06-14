// @flow
import * as React from "react";
import Section from "grommet/components/Section";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ContentBox from "../contentBox/ContentBox";
import ItemsList from "../list/ItemsList";
import ItemListHeader from "./../list/ItemListHeader";
import MeasurementContainer from "../../containers/measurements/MeasurementContainer";
import AnchorMeasurementItemRenderer from "../measurements/AnchorMeasurementItemRenderer";
import RoomModel from "../../models/Room";
import Measurement from "../../models/Measurement";

type Props = {
	match: any,
	room: RoomModel,
	onDeleteMeasurement: (item: Measurement) => void
};

export default function Room({ match, room, onDeleteMeasurement }: Props) {
	return (
		<ContentBox heading={room.name} subheading={room.description}>
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
		</ContentBox>
	);
}

Room.defaultProps = {
	currentMeasurement: null
};
