// @flow
import * as React from "react";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";
import ListPlaceholder from "grommet-addons/components/ListPlaceholder";

import Measurement from "../../models/Measurement";

type Props = {
	measurements?: ?(Measurement[])
};

export default function MeasurementsList({ measurements }: Props) {
	const listItemPadding = {
		horizontal: "none",
		vertical: "medium"
	};

	const unfilteredTotal = measurements ? measurements.length : 0;
	const filteredTotal = measurements ? measurements.length : 0;

	return (
		<React.Fragment>
			<ListPlaceholder
				unfilteredTotal={unfilteredTotal}
				filteredTotal={filteredTotal}
			/>
			<List selectable>
				{measurements &&
					measurements.map(measurement => (
						<ListItem
							key={measurement.measurementId}
							pad={listItemPadding}
							justify="between"
						>
							<span>{measurement.description}</span>
							<span>{new Date(measurement.startDate).toLocaleString()}</span>
						</ListItem>
					))}
			</List>
		</React.Fragment>
	);
}

MeasurementsList.defaultProps = {
	measurements: null
};
