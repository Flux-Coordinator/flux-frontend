// @flow
import * as React from "react";
import Anchor from "grommet/components/Anchor";

import Room from "../../models/Room";

type Props = {
	item: Room,
	match: any
};

export default function AnchorProjectItemRenderer({ item, match }: Props) {
	if (item.roomId) {
		return (
			<Anchor path={`${match.url}/rooms/${item.roomId}`}>{item.name}</Anchor>
		);
	} else {
		return null;
	}
}
