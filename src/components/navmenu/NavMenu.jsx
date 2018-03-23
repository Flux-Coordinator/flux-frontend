// @flow
import * as React from "react";
import FolderIcon from "grommet/components/icons/base/Folder";
import FolderOpenIcon from "grommet/components/icons/base/FolderOpen";
import Menu from "grommet/components/Menu";
import Accordion from "grommet/components/Accordion";
import AccordionPanel from "grommet/components/AccordionPanel";
import Anchor from "grommet/components/Anchor";
import Heading from "grommet/components/Heading";

import RoomNavItem from "./RoomNavItem";
import Project from "../../models/Project";
import ProjectNavItem from "./ProjectNavItem";

type Props = {
	projects: Project[]
};

function AccordionHeading({ name }: { name: string }) {
	return <Heading tag="h4">{name}</Heading>;
}

export default function NavMenu({ projects }: Props) {
	const icon = <FolderOpenIcon size="xsmall" />;
	return (
		<Menu fill pad="none" primary size="small">
			{projects &&
				projects.map(project => (
					<Accordion key={project.id}>
						<AccordionPanel
							pad="small"
							icon={icon}
							heading={project.name}
							className="project-accordion"
						>
							{project.rooms.map(room => (
								<RoomNavItem room={room} key={room.id} />
							))}
						</AccordionPanel>
					</Accordion>
				))}
		</Menu>
	);
}
