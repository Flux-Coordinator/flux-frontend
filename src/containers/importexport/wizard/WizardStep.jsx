// @flow
import * as React from "react";
import Section from "grommet/components/Section";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";

type Props = {
	heading: React.Node,
	children: React.Node,
	onNext: () => void
};

export default function WizardStep({ heading, children, onNext }: Props) {
	return (
		<Section pad="small">
			<Header>
				<Heading tag="h3" margin="none" pad="small">
					{heading}
				</Heading>
			</Header>
			<Box>{children}</Box>
			<Box>
				<Button label="Next" onClick={onNext} />
			</Box>
		</Section>
	);
}
