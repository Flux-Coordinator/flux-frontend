// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Button from "grommet/components/Button";
import Title from "grommet/components/Title";
import Section from "grommet/components/Section";
import Box from "grommet/components/Box";
import Search from "grommet/components/Search";
import AddIcon from "grommet/components/icons/base/Add";

import ContentBox from "../contentBox/ContentBox";
import ItemsList from "./../list/ItemsList";
import ItemListHeader from "./../list/ItemListHeader";
import Project from "../../models/Project";
import AnchorProjectItemRenderer from "./AnchorProjectItemRenderer";

import type { ToastMetadata } from "./../toast/Toast";

type Props = {
	projects: Project[],
	loading: boolean
};

type State = {
	toast?: ToastMetadata
};

// export default function Projects({ projects, loading }: Props) {
export default class Projects extends React.Component<Props, State> {
	render() {
		const { projects, loading } = this.props;
		return (
			<ContentBox heading="Projekte">
				<Section>
					<Header size="small">
						<Title>Alle Projekte</Title>
						<Box flex justify="end" direction="row">
							<Search
								inline
								fill
								iconAlign="start"
								size="medium"
								placeholder="Projekte suchen"
							/>
						</Box>
					</Header>
				</Section>
				<Section>
					<ItemListHeader header="Projekte" path="/editProject" />
					<ItemsList
						items={projects}
						keyFunc={project => project.projectId}
						loading={loading}
						ItemRenderer={AnchorProjectItemRenderer}
					/>
				</Section>
			</ContentBox>
		);
	}
}
