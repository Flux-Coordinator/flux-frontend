// @flow
import * as React from "react";
import Section from "grommet/components/Section";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";
import SaveIcon from "grommet/components/icons/base/Save";
import NextIcon from "grommet/components/icons/base/Next";

type Props = {
	heading: React.Node,
	subheading?: React.Node,
	children: React.Node,
	onSubmit: () => void,
	isLastStep?: boolean
};

/**
 * The standard layout for a step in the wizard.
 * @param {*} props
 */
export default function WizardStep({
	heading,
	subheading,
	children,
	onSubmit,
	isLastStep
}: Props) {
	let button: React.Node;
	if (isLastStep) {
		button = (
			<Button
				primary
				label="Exportieren"
				icon={<SaveIcon />}
				onClick={onSubmit}
			/>
		);
	} else {
		button = (
			<Button primary label="Weiter" icon={<NextIcon />} onClick={onSubmit} />
		);
	}

	return (
		<Section pad="none">
			<Box>
				<Heading tag="h3" margin="none" pad="small">
					{heading}
				</Heading>
				<Heading tag="h4" margin="none" pad="small">
					{subheading}
				</Heading>
			</Box>
			<Box pad={{ vertical: "medium" }}>{children}</Box>
			<Box align={"end"}>{button}</Box>
		</Section>
	);
}
