import * as React from "react";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Section from "grommet/components/Section";
import Box from "grommet/components/Box";
import Search from "grommet/components/Search";

import ContentBox from "../contentBox/ContentBox";

export default function Projects() {
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
		</ContentBox>
	);
}
