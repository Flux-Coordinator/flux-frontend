// @flow
import * as React from "react";
import Button from "grommet/components/Button";

import Room from "../../models/Room";

type Props = {
	item: Room,
	match: any
};

export default function AnchorProjectItemRenderer({ item, match }: Props) {
	if (item.roomId) {
		return (
			<Button
				path={`${match.url}/rooms/${item.roomId}`}
				className="custom-list-anchor"
			>
				{item.name}
			</Button>
		);
	} else {
		return null;
	}
}
