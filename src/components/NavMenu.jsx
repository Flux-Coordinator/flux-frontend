// @flow

import * as React from "react";
import { List } from "material-ui";
import { withStyles } from "material-ui/styles";
import InboxIcon from "material-ui-icons/Inbox";
import NavMenuItem, {
	ProjectNavMenuItem,
	RoomNavMenuItem
} from "./NavMenuItem";

type Props = {
	menuItems: any[],
	classes: any
};

const styles = theme => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
});

function NavMenu({ menuItems, classes }: Props) {
	return (
		<div className={classes.root}>
			<List component="nav">
				<NavMenuItem icon={<InboxIcon />} primaryText="Default" />
				<ProjectNavMenuItem primaryText="Project" />
				<RoomNavMenuItem primaryText="Room" />
			</List>
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(NavMenu);
