// @flow
import * as React from "react";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";
import ListPlaceholder from "grommet-addons/components/ListPlaceholder";

import Project from "../../models/Project";

type Props = {
	projects: Project[]
};

export default function ProjectsList({ projects }: Props) {
	const listItemPadding = {
		horizontal: "none",
		vertical: "medium"
	};

	const unfilteredTotal = projects ? projects.length : 0;
	const filteredTotal = projects ? projects.length : 0;

	return (
		<React.Fragment>
			<ListPlaceholder
				unfilteredTotal={unfilteredTotal}
				filteredTotal={filteredTotal}
			/>
			<List selectable>
				{projects &&
					projects.map(project => (
						<ListItem key={project.id} pad={listItemPadding} justify="between">
							<span>{project.name}</span>
						</ListItem>
					))}
			</List>
		</React.Fragment>
	);
}
