// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import GrommetForm from "grommet/components/Form";
import Footer from "grommet/components/Footer";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";

type Props = {
	heading: React.Node,
	children: React.Node
};

export default function Form({ heading, children }: Props) {
	return (
		<GrommetForm pad="medium">
			<Header justify="between">
				<Heading tag="h2" margin="none" pad="medium">
					{heading}
				</Heading>
			</Header>
			<Box>{children}</Box>
			<Footer pad={{ vertical: "medium" }}>
				<Button label="Übermitteln" type="submit" primary />
			</Footer>
		</GrommetForm>
	);
}
