// @flow
import * as React from "react";
import Anchor from "grommet/components/Anchor";

import Measurement from "../../models/Measurement";

type Props = {
	item: Measurement,
	match: any
};

export default function AnchorMeasurementItemRenderer({ item, match }: Props) {
	if (item.measurementId) {
		return (
			<Anchor path={`${match.url}/measurements/${item.measurementId}`}>
				<span>{item.description}</span>
				<span>{item.startDate.toLocaleString()}</span>
			</Anchor>
		);
	} else {
		return null;
	}
}
