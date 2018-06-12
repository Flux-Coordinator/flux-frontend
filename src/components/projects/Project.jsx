// @flow
import * as React from "react";
import Box from "grommet/components/Box";

import NotFound from "../../components/notfound/NotFound";
import ContentBox from "../contentBox/ContentBox";
import ProjectModel from "../../models/Project";
import RoomModel from "../../models/Room";
import ItemsList from "../list/ItemsList";
import ItemListHeader from "./../list/ItemListHeader";
import AnchorRoomItemRenderer from "../room/AnchorRoomItemRenderer";

type Props = {
	projects: ProjectModel[],
	match: any,
	onDeleteRoom: (item: RoomModel) => void
};

function findProject(projects: ProjectModel[], projectId: number) {
	return projects.find(
		project => project.projectId === parseInt(projectId, 10)
	);
}

export default function Project({ projects, match, onDeleteRoom }: Props) {
	const project = findProject(projects, match.params.projectId);

	if (!project) {
		return <NotFound info="Das Projekt konnte nicht gefunden werden." />;
	}

	return (
		<ContentBox heading={project.name} subheading={project.description}>
			<Box>
				<ItemListHeader
					header="Räume"
					path={`/projects/${match.params.projectId}/editRoom`}
				/>
				<ItemsList
					items={project.rooms}
					keyFunc={item => item.roomId}
					ItemRenderer={({ item }) => (
						<AnchorRoomItemRenderer
							item={item}
							match={match}
							onDelete={onDeleteRoom}
						/>
					)}
				/>
			</Box>
		</ContentBox>
	);
}
