import * as React from "react";
import { withStyles } from "material-ui/styles";
import { ListItem, ListItemIcon, ListItemText } from "material-ui";
import InboxIcon from "material-ui-icons/Inbox";

type NavMenuItemProps = {
	primaryText: string,
	icon: React.Node
};

const styles = theme => ({});

function NavMenuItem(props: NavMenuItemProps) {
	const { primaryText, icon } = props;
	return (
		<ListItem button>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={primaryText} />
		</ListItem>
	);
}

function ProjectNavMenuItem(props) {
	return <NavMenuItem icon={<InboxIcon />} primary="test" />;
}

function RoomNavMenuItem(props) {
	return <NavMenuItem />;
}

export default withStyles(styles, { withTheme: true })(NavMenuItem);
