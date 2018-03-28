// @flow
import * as React from "react";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";
import Anchor from "grommet/components/Anchor";
import ListPlaceholder from "grommet-addons/components/ListPlaceholder";

import Project from "../../models/Project";

type Props = {
	projects: ?(Project[])
};

const listItemPadding = {
	horizontal: "none",
	vertical: "medium"
};

export default function ProjectsList({ projects }: Props) {
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
					projects.map(project => {
						return (
							<ListItem key={project.id} pad={listItemPadding}>
								<Anchor path={"/projects/" + project.id}>{project.name}</Anchor>
							</ListItem>
						);
					})}
			</List>
		</React.Fragment>
	);
}

ProjectsList.defaultProps = {
	projects: null
};
