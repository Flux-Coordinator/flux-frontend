// @flow
import * as React from "react";
import { withStyles } from "material-ui/styles";
import { ListItem, ListItemIcon, ListItemText } from "material-ui";

type NavMenuItemProps = {
	primaryText: string,
	icon: React.Node,
	children?: React.Node,
	onClick?: () => void
};

const styles = theme => ({});

function NavMenuItem(props: NavMenuItemProps) {
	const { primaryText, icon, children, onClick } = props;
	return (
		<ListItem button onClick={onClick}>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={primaryText} />
			{children}
		</ListItem>
	);
}

NavMenuItem.defaultProps = {
	children: null,
	onClick: null
};

export default withStyles(styles, { withTheme: true })(NavMenuItem);
