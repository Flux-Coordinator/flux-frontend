// @flow
import * as React from "react";
import Heading from "grommet/components/Heading";

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
					<Heading tag="h4" strong>
						{item.name}
					</Heading>
					<Heading tag="h5">{item.description}</Heading>
				</ItemListAnchorButton>
				<ItemListEditButton path={`/editProject/${item.projectId}`} />
			</React.Fragment>
		);
	} else {
		return null;
	}
}
