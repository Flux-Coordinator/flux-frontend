// @flow
import * as React from "react";
import Section from "grommet/components/Section";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";

type Props = {
	heading: React.Node,
	subheading?: React.Node,
	children: React.Node,
	onNext: () => void
};

/**
 * The standard layout for a step in the wizard.
 * @param {*} props
 */
export default function WizardStep({
	heading,
	subheading,
	children,
	onNext
}: Props) {
	return (
		<Section pad="small">
			<Header>
				<Heading tag="h3" margin="none" pad="small">
					{heading}
				</Heading>
			</Header>
			<Header size="small">
				<Heading tag="h4" margin="none" pad="small">
					{subheading}
				</Heading>
			</Header>
			<Box>{children}</Box>
			<Box>
				<Button label="Next" onClick={onNext} />
			</Box>
		</Section>
	);
}
