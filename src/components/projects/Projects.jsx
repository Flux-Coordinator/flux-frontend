// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Section from "grommet/components/Section";
import Box from "grommet/components/Box";
import Search from "grommet/components/Search";
import Heading from "grommet/components/Heading";

import ContentBox from "../contentBox/ContentBox";
import ItemsList from "./../list/ItemsList";
import Project from "../../models/Project";
import AddProjectButton from "./AddProjectButton";
import AnchorProjectItemRenderer from "./AnchorProjectItemRenderer";

type Props = {
	projects: Project[],
	loading: boolean
};

export default function Projects({ projects, loading }: Props) {
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
				<Header size="small">
					<Heading tag="h3">Projekte</Heading>
					<AddProjectButton />
				</Header>
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
