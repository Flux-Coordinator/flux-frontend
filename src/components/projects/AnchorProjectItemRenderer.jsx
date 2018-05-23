// @flow
import * as React from "react";
import Button from "grommet/components/Button";
import Anchor from "grommet/components/Anchor";

import Project from "../../models/Project";

type Props = {
	item: Project
};

export default function AnchorProjectItemRenderer({ item }: Props) {
	if (item.projectId) {
		return (
			<Button
				path={`/projects/${item.projectId}`}
				className="custom-list-anchor"
			>
				{item.name}
			</Button>
		);
	} else {
		return null;
	}
}
