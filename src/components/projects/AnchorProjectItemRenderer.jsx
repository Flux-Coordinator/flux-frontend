// @flow
import * as React from "react";
import Anchor from "grommet/components/Anchor";

import Project from "../../models/Project";

type Props = {
	item: Project
};

export default function AnchorProjectItemRenderer({ item }: Props) {
	if (item.projectId) {
		return <Anchor path={`/projects/${item.projectId}`}>{item.name}</Anchor>;
	} else {
		return null;
	}
}
