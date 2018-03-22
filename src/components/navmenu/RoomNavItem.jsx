// @flow
import React from "react";
import { NavLink } from "react-router-dom";
import NoteIcon from "grommet/components/icons/base/Note";

import NavMenuItem from "./NavMenuItem";
import Room from "../../models/Room";

type Props = {
	room: Room
};

export default function RoomNavItem({ room }: Props) {
	console.log(room);
	return (
		<NavLink to={"/room/" + room.id}>
			<NavMenuItem icon={<NoteIcon />} primaryText={room.name} />
		</NavLink>
	);
}
