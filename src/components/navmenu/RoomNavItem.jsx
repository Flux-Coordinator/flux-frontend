// @flow
import React from "react";
import Button from "grommet/components/Button";

import Room from "../../models/Room";

type Props = {
	room: Room,
	onClick?: () => void
};

export default function RoomNavItem({ room, onClick }: Props) {
	const path: string = `/rooms/${room.id}`;
	return (
		<Button path={path} onClick={onClick}>
			{room.name}
		</Button>
	);
}

RoomNavItem.defaultProps = {
	onClick: null
};
