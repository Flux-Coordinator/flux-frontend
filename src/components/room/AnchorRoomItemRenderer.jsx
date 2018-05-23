// @flow
import * as React from "react";

import Room from "../../models/Room";
import ItemListAnchorButton from "../list/ItemListAnchorButton";
import ItemListEditButton from "../list/ItemListEditButton";

type Props = {
	item: Room,
	match: any
};

export default function AnchorProjectItemRenderer({ item, match }: Props) {
	if (item.roomId) {
		return (
			<React.Fragment>
				<ItemListAnchorButton path={`${match.url}/rooms/${item.roomId}`}>
					{item.name}
				</ItemListAnchorButton>
				<ItemListEditButton path={`/editRoom/${item.roomId}`} />
			</React.Fragment>
		);
	} else {
		return null;
	}
}
