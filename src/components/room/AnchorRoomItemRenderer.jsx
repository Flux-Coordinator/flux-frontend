// @flow
import * as React from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";

import Room from "../../models/Room";
import ItemListAnchorButton from "../list/ItemListAnchorButton";
import ItemListEditButton from "../list/ItemListEditButton";
import ItemListDeleteButton from "../list/ItemListDeleteButton";

type Props = {
	item: Room,
	match: any,
	onDelete: (item: Room) => void
};

export default function AnchorProjectItemRenderer({
	item,
	match,
	onDelete
}: Props) {
	if (item.roomId) {
		return (
			<React.Fragment>
				<ItemListAnchorButton path={`${match.url}/rooms/${item.roomId}`}>
					<Heading tag="h4" strong>
						{item.name}
					</Heading>
					<Heading tag="h5">{item.description}</Heading>
				</ItemListAnchorButton>
				<Box align="center" direction="row" responsive={false}>
					<ItemListEditButton path={`${match.url}/editRoom/${item.roomId}`} />
					<ItemListDeleteButton onClick={() => onDelete(item)} />
				</Box>
			</React.Fragment>
		);
	} else {
		return null;
	}
}
