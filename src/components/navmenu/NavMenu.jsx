// @flow
import * as React from "react";
import FolderOpenIcon from "grommet/components/icons/base/FolderOpen";
import Menu from "grommet/components/Menu";
import Accordion from "grommet/components/Accordion";
import AccordionPanel from "grommet/components/AccordionPanel";

import RoomNavItem from "./RoomNavItem";
import Project from "../../models/Project";

type Props = {
	projects: Project[],
	onNavigate?: () => void
};

export default function NavMenu({ projects, onNavigate }: Props) {
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
								<RoomNavItem room={room} key={room.id} onClick={onNavigate} />
							))}
						</AccordionPanel>
					</Accordion>
				))}
		</Menu>
	);
}

NavMenu.defaultProps = {
	onNavigate: null
};
