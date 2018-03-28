// @flow
import * as React from "react";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";

import Room from "../../models/Room";

type Props = {
	rooms: Room[]
};

export default function RoomList({ rooms }: Props) {
	const listItemPadding = {
		horizontal: "none",
		vertical: "medium"
	};

	return (
		<List selectable>
			{rooms &&
				rooms.map(room => (
					<ListItem key={room.id} pad={listItemPadding} justify="between">
						<span>{room.name}</span>
					</ListItem>
				))}
		</List>
	);
}
