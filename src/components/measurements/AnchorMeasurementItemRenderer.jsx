// @flow
import * as React from "react";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";
import Timestamp from "grommet/components/Timestamp";

import Measurement from "../../models/Measurement";

type Props = {
	item: Measurement,
	match: any
};

export default function AnchorMeasurementItemRenderer({ item, match }: Props) {
	if (item.measurementId) {
		return (
			<Button
				path={`${match.url}/measurements/${item.measurementId}`}
				className="custom-list-anchor"
			>
				<Box alignContent="around">
					<span>
						<strong>{item.description}</strong>
					</span>
					<Timestamp value={item.startDate} />
				</Box>
			</Button>
		);
	} else {
		return null;
	}
}
