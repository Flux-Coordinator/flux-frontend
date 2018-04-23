// @flow
import * as React from "react";
import Anchor from "grommet/components/Anchor";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";
import ListPlaceholder from "grommet-addons/components/ListPlaceholder";

import Measurement from "../../models/Measurement";
import Project from "../../models/Project";
import Room from "../../models/Room";

type Props = {
	measurements?: ?(Measurement[]),
	parentProject: Project,
	parentRoom: Room
};

export default function MeasurementsList({
	measurements,
	parentProject,
	parentRoom
}: Props) {
	const listItemPadding = {
		horizontal: "none",
		vertical: "medium"
	};

	const project = parentProject;
	if(project === null || typeof project === "undefined") {
		return;
	}

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
							<Anchor
								path={`/projects/${project.projectId}/rooms/${
									parentRoom.name
								}/measurements/${measurement.measurementId}`}
							>
								<span>{measurement.description}</span>
								<span>{measurement.startDate.toLocaleString()}</span>
							</Anchor>
						</ListItem>
					))}
			</List>
		</React.Fragment>
	);
}

MeasurementsList.defaultProps = {
	measurements: null
};
