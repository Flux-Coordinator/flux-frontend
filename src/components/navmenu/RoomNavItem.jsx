// @flow
import React from "react";
import { NavLink } from "react-router-dom";
import NoteIcon from "grommet/components/icons/base/Note";
import Anchor from "grommet/components/Anchor";

import NavMenuItem from "./NavMenuItem";
import Room from "../../models/Room";

type Props = {
	room: Room
};

export default function RoomNavItem({ room }: Props) {
	const path: string = `/rooms/${room.id}`;
	return (
		<Anchor path={path}>{room.name}</Anchor>
		// <NavLink to={"/room/" + room.id}>
		// 	<NavMenuItem icon={<NoteIcon />} primaryText={room.name} />
		// </NavLink>
	);
}
