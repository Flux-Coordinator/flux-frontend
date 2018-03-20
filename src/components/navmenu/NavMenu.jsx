// @flow
import * as React from "react";
import { withStyles } from "material-ui/styles";
import { List } from "material-ui";

import ProjectNavItem from "./ProjectNavItem";
import Project from "../../models/Project";

type Props = {
	classes: Object,
	projects: Project[]
};

const styles = theme => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
});

function NavMenu({ classes, projects }: Props) {
	return (
		<div className={classes.root}>
			<List component="nav" className={classes.root}>
				{projects &&
					projects.map(project => (
						<ProjectNavItem project={project} key={project.id} />
					))}
			</List>
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(NavMenu);
