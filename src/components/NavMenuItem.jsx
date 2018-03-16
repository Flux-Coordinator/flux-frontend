// @flow
import * as React from "react";
import { withStyles } from "material-ui/styles";
import { ListItem, ListItemIcon, ListItemText } from "material-ui";
import FolderIcon from "material-ui-icons/Folder";
import InsertDriveFileIcon from "material-ui-icons/InsertDriveFile";

type NavMenuItemProps = {
	primaryText: string,
	icon: React.Node
};

type SpecificMenuItemProps = {
	primaryText: string
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

function ProjectNavMenuItemComponent({ primaryText }: SpecificMenuItemProps) {
	return <NavMenuItem icon={<FolderIcon />} primaryText={primaryText} />;
}

function RoomNavMenuItemComponent({ primaryText }: SpecificMenuItemProps) {
	return (
		<NavMenuItem icon={<InsertDriveFileIcon />} primaryText={primaryText} />
	);
}

const ProjectNavMenuItem = withStyles(styles, { withTheme: true })(
	ProjectNavMenuItemComponent
);
const RoomNavMenuItem = withStyles(styles, { withTheme: true })(
	RoomNavMenuItemComponent
);

export { ProjectNavMenuItem, RoomNavMenuItem };
export default withStyles(styles, { withTheme: true })(NavMenuItem);
