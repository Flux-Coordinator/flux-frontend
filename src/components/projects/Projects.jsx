// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Section from "grommet/components/Section";
import Box from "grommet/components/Box";
import Search from "grommet/components/Search";
import Heading from "grommet/components/Heading";

import ContentBox from "../contentBox/ContentBox";
import ProjectsList from "./ProjectsList";
import Project from "../../models/Project";
import AddProjectButton from "../addProjectButton/AddProjectButton";

type Props = {
	projects: Project[]
};

export default function Projects({ projects }: Props) {
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
				<ProjectsList projects={projects} />
			</Section>
		</ContentBox>
	);
}
