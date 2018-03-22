// @flow
import * as React from "react";
import Menu from "grommet/components/Menu";
import Accordion from "grommet/components/Accordion";

import Project from "../../models/Project";
import ProjectNavItem from "./ProjectNavItem";

type Props = {
	projects: Project[]
};

export default function NavMenu({ projects }: Props) {
	return (
		<Menu fill={true} pad="none" primary size="small">
			{projects &&
				projects.map(project => (
					<Accordion key={project.id}>
						<ProjectNavItem project={project} key={project.id} />
					</Accordion>
				))}
		</Menu>
	);
}
