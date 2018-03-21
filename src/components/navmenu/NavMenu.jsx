// @flow

import * as React from "react";
import { List } from "material-ui";
import { withStyles } from "material-ui/styles";
import type { Project } from "../../types/Models";
import ProjectNavItem from "./ProjectNavItem";

type Props = {
	classes: any,
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
