// @flow
import * as React from "react";
import Heading from "grommet/components/Heading";
import Paragraph from "grommet/components/Paragraph";
import Timestamp from "grommet/components/Timestamp";

import Measurement from "../../models/Measurement";
import ItemListAnchorButton from "../list/ItemListAnchorButton";
import ItemListEditButton from "../list/ItemListEditButton";

type Props = {
	item: Measurement,
	match: any
};

export default function AnchorMeasurementItemRenderer({ item, match }: Props) {
	if (item.measurementId) {
		return (
			<React.Fragment>
				<ItemListAnchorButton
					path={`${match.url}/measurements/${item.measurementId}`}
				>
					<Heading tag="h4" strong>
						{item.name}
					</Heading>
					<Heading tag="h5">{item.description}</Heading>
					<Paragraph margin="small">
						Status:{" "}
						<strong className="measurement-state-badge">
							{item.measurementState}
						</strong>
					</Paragraph>
				</ItemListAnchorButton>
				<ItemListEditButton
					path={`${match.url}/editMeasurement/${item.measurementId}`}
				/>
			</React.Fragment>
		);
	} else {
		return null;
	}
}
