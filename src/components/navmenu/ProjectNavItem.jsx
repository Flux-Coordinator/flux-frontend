// @flow
import * as React from "react";
import FolderIcon from "grommet/components/icons/base/Folder";
import FolderOpenIcon from "grommet/components/icons/base/FolderOpen";
import AccordionPanel from "grommet/components/AccordionPanel";
import Anchor from "grommet/components/Anchor";

import RoomNavItem from "./RoomNavItem";
import Project from "../../models/Project";

type Props = {
	project: Project
};

type State = {
	isOpen: boolean
};

export default class ProjectNavItem extends React.Component<Props, State> {
	state = {
		isOpen: false
	};

	toggleCollapse = () => {
		this.setState(prevState => ({ isOpen: !prevState.isOpen }));
	};

	render() {
		const { project } = this.props;
		const icon = this.state.isOpen ? (
			<FolderOpenIcon size="xsmall" />
		) : (
			<FolderIcon size="xsmall" />
		);
		const heading = <Anchor icon={icon}>{project.name}</Anchor>;
		return (
			<AccordionPanel pad="none" icon={icon} heading={heading}>
				{project.rooms.map(room => <RoomNavItem room={room} key={room.id} />)}
			</AccordionPanel>
		);
	}
}
