// @flow
import * as React from "react";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";
import ListPlaceholder from "grommet-addons/components/ListPlaceholder";
import Spinning from "grommet/components/icons/Spinning";

import Project from "../../models/Project";

type Props = {
	projects?: ?(Project[]),
	selectable?: boolean | "multiple",
	loading?: boolean,
	ProjectItemRenderer: React.ComponentType<{ project: Project }>
};

const listItemPadding = {
	horizontal: "none",
	vertical: "medium"
};

export default function ProjectsList({
	projects,
	loading,
	selectable,
	ProjectItemRenderer
}: Props) {
	if (loading) {
		return <Spinning size="large" />;
	}

	const unfilteredTotal = projects ? projects.length : 0;
	const filteredTotal = projects ? projects.length : 0;

	return (
		<React.Fragment>
			<ListPlaceholder
				unfilteredTotal={unfilteredTotal}
				filteredTotal={filteredTotal}
			/>
			<List selectable={selectable}>
				{projects &&
					projects.map(project => (
						<ListItem key={project.projectId} pad={listItemPadding}>
							<ProjectItemRenderer project={project} />
						</ListItem>
					))}
			</List>
		</React.Fragment>
	);
}

ProjectsList.defaultProps = {
	projects: null,
	loading: false
};
