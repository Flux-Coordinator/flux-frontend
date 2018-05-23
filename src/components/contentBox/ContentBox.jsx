// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Article from "grommet/components/Article";
import Box from "grommet/components/Box";
import { withRouter } from "react-router";

type Props = {
	heading: React.Node,
	children: React.Node,
	location: any
};

class ContentBox extends React.Component<Props> {
	render() {
		return (
			<Article pad="medium">
				<Header justify="between">
					<Heading tag="h2" margin="none" pad="medium">
						{this.props.heading}
					</Heading>
				</Header>
				<Box>{this.props.children}</Box>
			</Article>
		);
	}
}

export default withRouter(ContentBox);
