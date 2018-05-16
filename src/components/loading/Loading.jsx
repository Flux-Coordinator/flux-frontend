// @flow
import * as React from "react";
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Spinning from "grommet/components/icons/Spinning";

export default function Loading() {
	return (
		<Box align="center" justify="center" full>
			<Header pad="none" margin="none">
				<Heading tag="h1">Bitte warten</Heading>
			</Header>
			<Spinning size="large" />
		</Box>
	);
}
