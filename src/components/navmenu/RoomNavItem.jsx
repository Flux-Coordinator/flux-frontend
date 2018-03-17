import React from "react";
import { withStyles } from "material-ui/styles/index";
import InsertDriveFileIcon from "material-ui-icons/InsertDriveFile";

import NavMenuItem from "./NavMenuItem";
import type { Room } from "../../types/Models";

type Props = {
	room: Room
};

const styles = theme => ({});

function RoomNavItem({ room }: Props) {
	return <NavMenuItem icon={<InsertDriveFileIcon />} primaryText={room.name} />;
}

export default withStyles(styles, { withTheme: true })(RoomNavItem);
