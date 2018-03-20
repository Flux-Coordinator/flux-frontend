import * as React from "react";
import { Typography } from "material-ui";

import RoomModel from "../../models/Room";

type Props = {
	room: RoomModel
};

export default function Room({ room }: Props) {
	return (
		<React.Fragment>
			<Typography variant={"headline"}>
				This is the room with the ID: {room.id}
			</Typography>
			<Typography variant={"subheading"}>
				This is the room with the name: {room.name}
			</Typography>
		</React.Fragment>
	);
}
