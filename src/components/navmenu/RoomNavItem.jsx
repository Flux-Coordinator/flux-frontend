// @flow
import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles } from "material-ui/styles/index";
import InsertDriveFileIcon from "material-ui-icons/InsertDriveFile";

import NavMenuItem from "./NavMenuItem";
import Room from "../../models/Room";

type Props = {
	classes: Object,
	room: Room
};

const styles = theme => ({
	link: {
		textDecoration: "none"
	}
});

function RoomNavItem({ classes, room }: Props) {
	return (
		<NavLink className={classes.link} to={"/room/" + room.id}>
			<NavMenuItem icon={<InsertDriveFileIcon />} primaryText={room.name} />
		</NavLink>
	);
}

export default withStyles(styles, { withTheme: true })(RoomNavItem);
