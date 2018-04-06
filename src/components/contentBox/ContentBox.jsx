import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Article from "grommet/components/Article";
import Box from "grommet/components/Box";

type Props = {
	heading: React.Node,
	children: React.Node
};

export default function ContentBox({ heading, children }: Props) {
	return (
		<Article pad="medium">
			<Header justify="between">
				<Heading tag="h2" margin="none" pad="medium">
					{heading}
				</Heading>
			</Header>
			<Box>{children}</Box>
		</Article>
	);
}
