// @flow
import * as React from "react";
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";

import ContentBox from "../contentBox/ContentBox";
import ProjectModel from "../../models/Project";
import ItemsList from "../list/ItemsList";
import AnchorRoomItemRenderer from "../room/AnchorRoomItemRenderer";

type Props = {
	project: ProjectModel,
	match: any
};

export default function Project({ project, match }: Props) {
	return (
		<ContentBox heading={project.name}>
			<Box>
				<Header size="small">
					<Heading tag="h3">Räume</Heading>
				</Header>
				<ItemsList
					items={project.rooms}
					keyFunc={item => item.roomId}
					ItemRenderer={({ item }) => AnchorRoomItemRenderer({ item, match })}
				/>
			</Box>
		</ContentBox>
	);
}
