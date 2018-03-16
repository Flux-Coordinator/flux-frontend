// @flow

import * as React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "material-ui";
import { withStyles } from "material-ui/styles";
import InboxIcon from "material-ui-icons/Inbox";

type Props = {
	classes: any
};

const styles = theme => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
});

function NavMenu({ classes }: Props) {
	return (
		<div className={classes.root}>
			<List component="nav">
				<ListItem button>
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText primary="Inbox" />
				</ListItem>
			</List>
		</div>
	);
}

export default withStyles(styles)(NavMenu);
