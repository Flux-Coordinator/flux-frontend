// @flow
import * as React from "react";

import ContentBox from "../contentBox/ContentBox";
import ItemsList from "./../list/ItemsList";
import ItemListHeader from "./../list/ItemListHeader";
import Project from "../../models/Project";
import AnchorProjectItemRenderer from "./AnchorProjectItemRenderer";

import type { ToastMetadata } from "./../toast/Toast";

type Props = {
	projects: Project[],
	loading: boolean,
	onDeleteProject: (project: Project) => void
};

type State = {
	toast?: ToastMetadata
};

// export default function Projects({ projects, loading }: Props) {
export default class Projects extends React.Component<Props, State> {
	render() {
		const { projects, loading, onDeleteProject } = this.props;
		return (
			<ContentBox heading="Projekte">
				<ItemListHeader header="Projekte" path="/editProject" />
				<ItemsList
					items={projects}
					keyFunc={project => project.projectId}
					loading={loading}
					ItemRenderer={({ item }) => (
						<AnchorProjectItemRenderer onDelete={onDeleteProject} item={item} />
					)}
				/>
			</ContentBox>
		);
	}
}
