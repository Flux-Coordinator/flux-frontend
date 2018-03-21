// @flow
import * as React from "react";
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";
import Actions from "grommet/components/icons/base/Actions";

import Project from "../../models/Project";

type Props = {
	projects: Project[]
};

export default function NavMenu({ projects }: Props) {
	return (
		<Menu fill={true} primary={true}>
			{projects &&
				projects.map(project => <Anchor href="#">{project.name}</Anchor>)}
		</Menu>
	);
}
