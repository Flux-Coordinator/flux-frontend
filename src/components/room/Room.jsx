// @flow
import * as React from "react";
import Heading from "grommet/components/Heading";

import RoomModel from "../../models/Room";

type Props = {
	room: RoomModel
};

export default function Room({ room }: Props) {
	return (
		<React.Fragment>
			<Heading tag="h1">This is the room with the ID: {room.id}</Heading>
			<Heading tag="h2">This is the room with the name: {room.name}</Heading>
		</React.Fragment>
	);
}
