// @flow
import * as React from "react";
import Timestamp from "grommet/components/Timestamp";

import Measurement from "../../models/Measurement";
import ItemListAnchorButton from "../list/ItemListAnchorButton";
import ItemListEditButton from "../list/ItemListEditButton";

type Props = {
	item: Measurement,
	match: any
};

export default function AnchorMeasurementItemRenderer({ item, match }: Props) {
	if (item.measurementId) {
		return (
			<React.Fragment>
				<ItemListAnchorButton
					path={`${match.url}/measurements/${item.measurementId}`}
				>
					<span>{item.description}</span>
					<Timestamp value={item.startDate} />
				</ItemListAnchorButton>
				<ItemListEditButton path={`/editMeasurement/${item.measurementId}`} />
			</React.Fragment>
		);
	} else {
		return null;
	}
}
