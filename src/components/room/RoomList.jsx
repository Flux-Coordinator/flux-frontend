// @flow
import * as React from "react";
import Anchor from "grommet/components/Anchor";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";
import ListPlaceholder from "grommet-addons/components/ListPlaceholder";

import Room from "../../models/Room";

type Props = {
	rooms: Room[]
};

const listItemPadding = {
	horizontal: "none",
	vertical: "medium"
};

export default function RoomList({ rooms }: Props) {
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
						<ListItem key={room.id} pad={listItemPadding} justify="between">
							<Anchor path={"/rooms/" + room.id}>{room.name}</Anchor>
						</ListItem>
					))}
			</List>
		</React.Fragment>
	);
}
