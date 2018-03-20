// @flow
import * as React from "react";
import { withStyles } from "material-ui/styles/index";
import FolderIcon from "material-ui-icons/Folder";
import { ExpandLess, ExpandMore } from "material-ui-icons";
import { Collapse, List } from "material-ui";

import NavMenuItem from "./NavMenuItem";
import RoomNavItem from "./RoomNavItem";
import Project from "../../models/Project";

type Props = {
	classes: any,
	project: Project
};

type State = {
	isOpen: boolean
};

const styles = theme => ({
	nested: {
		paddingLeft: theme.spacing.unit * 4
	}
});

class ProjectNavItem extends React.Component<Props, State> {
	state = {
		isOpen: false
	};

	toggleCollapse = () => {
		this.setState(prevState => ({ isOpen: !prevState.isOpen }));
	};

	render() {
		const { classes, project } = this.props;

		return (
			<React.Fragment>
				<NavMenuItem
					icon={<FolderIcon />}
					primaryText={project.name}
					onClick={this.toggleCollapse}
				>
					{this.state.isOpen ? <ExpandLess /> : <ExpandMore />}
				</NavMenuItem>
				<Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{project.rooms &&
							project.rooms.map(room => (
								<RoomNavItem
									className={classes.nested}
									room={room}
									key={room.id}
								/>
							))}
					</List>
				</Collapse>
			</React.Fragment>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ProjectNavItem);
