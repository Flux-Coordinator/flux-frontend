// @flow
import * as React from "react";
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";

import ContentBox from "../contentBox/ContentBox";
import RoomList from "../room/RoomList";
import ProjectModel from "../../models/Project";

type Props = {
	project: ProjectModel
};

export default function Project({ project }: Props) {
	return (
		<ContentBox heading={project.name}>
			<Box>
				<Header size="small">
					<Heading tag="h3">Räume</Heading>
				</Header>
				<RoomList parentProject={project} rooms={project.rooms} />
			</Box>
		</ContentBox>
	);
}
