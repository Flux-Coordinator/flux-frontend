// @flow
import React from "react";
import Button from "grommet/components/Button";

import Room from "../../models/Room";

type Props = {
	room: Room
};

export default function RoomNavItem({ room }: Props) {
	const path: string = `/rooms/${room.id}`;
	return <Button path={path}>{room.name}</Button>;
}
