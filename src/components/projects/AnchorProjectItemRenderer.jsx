// @flow
import * as React from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";

import Project from "../../models/Project";
import ItemListAnchorButton from "../list/ItemListAnchorButton";
import ItemListEditButton from "../list/ItemListEditButton";
import ItemListDeleteButton from "../list/ItemListDeleteButton";

type Props = {
	item: Project,
	onDelete: (item: Project) => void
};

export default function AnchorProjectItemRenderer({ item, onDelete }: Props) {
	if (item.projectId) {
		return (
			<React.Fragment>
				<ItemListAnchorButton path={`/projects/${item.projectId}`}>
					<Heading tag="h4" strong>
						{item.name}
					</Heading>
					<Heading tag="h5">{item.description}</Heading>
				</ItemListAnchorButton>
				<Box direction="row" align="center" responsive={false}>
					<ItemListEditButton path={`/editProject/${item.projectId}`} />
					<ItemListDeleteButton onClick={() => onDelete(item)} />
				</Box>
			</React.Fragment>
		);
	} else {
		return null;
	}
}
