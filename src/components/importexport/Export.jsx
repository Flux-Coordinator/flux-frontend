// @flow
import * as React from "react";
import Section from "grommet/components/Section";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";

import ExportWizard from "./../../containers/importexport/ExportWizard";

export default function Export() {
	return (
		<Section>
			<Header>
				<Title>Export</Title>
			</Header>
			<ExportWizard />
		</Section>
	);
}
