// @flow
import * as React from "react";
import Anchor from "grommet/components/Anchor";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";
import ListPlaceholder from "grommet-addons/components/ListPlaceholder";

import Project from "../../models/Project";

type Props = {
	parentProject: Project
};

const listItemPadding = {
	horizontal: "none",
	vertical: "medium"
};

export default function RoomList({ parentProject }: Props) {
	if (parentProject.projectId == null) {
		throw new Error(
			"The project tried to access had a projectId with null value."
		);
	}

	const { rooms } = parentProject;
	const unfilteredTotal = rooms ? rooms.length : 0;
	const filteredTotal = rooms ? rooms.length : 0;
	return (
		<React.Fragment>
			<ListPlaceholder
				unfilteredTotal={unfilteredTotal}
				filteredTotal={filteredTotal}
			/>
			<List selectable>
				{rooms &&
					rooms.map(room => (
						<ListItem key={room.name} pad={listItemPadding} justify="between">
							<Anchor
								path={`/projects/${parentProject.projectId}/rooms/${room.name}`}
							>
								{room.name}
							</Anchor>
						</ListItem>
					))}
			</List>
		</React.Fragment>
	);
}
