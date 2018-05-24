// @flow
import * as React from "react";

import Project from "../../models/Project";
import ItemListAnchorButton from "../list/ItemListAnchorButton";
import ItemListEditButton from "../list/ItemListEditButton";

type Props = {
	item: Project
};

export default function AnchorProjectItemRenderer({ item, onEdit }: Props) {
	if (item.projectId) {
		return (
			<React.Fragment>
				<ItemListAnchorButton path={`/projects/${item.projectId}`}>
					{item.name}
				</ItemListAnchorButton>
				<ItemListEditButton path={`/editProject/${item.projectId}`} />
			</React.Fragment>
		);
	} else {
		return null;
	}
}
