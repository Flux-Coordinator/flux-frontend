// @flow
import * as React from "react";
import Anchor from "grommet/components/Anchor";

import Project from "../../models/Project";

type Props = {
	project: Project
};

export default function AnchorProjectItemRenderer({ project }: Props) {
	if (project.projectId) {
		return (
			<Anchor path={`/projects/${project.projectId}`}>{project.name}</Anchor>
		);
	} else {
		return null;
	}
}
