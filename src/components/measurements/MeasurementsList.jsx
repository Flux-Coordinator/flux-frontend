// @flow
import * as React from "react";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";

import Measurement from "../../models/Measurement";

type Props = {
	measurements: Measurement[]
};
export default function MeasurementsList({ measurements }: Props) {
	return (
		<List selectable>
			{measurements &&
				measurements.map(measurement => (
					<ListItem key={measurement.id} justify="between">
						<span>{measurement.description}</span>
						<span>{measurement.date.toLocaleString()}</span>
					</ListItem>
				))}
		</List>
	);
}
