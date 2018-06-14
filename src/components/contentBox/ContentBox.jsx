// @flow
import * as React from "react";
import Heading from "grommet/components/Heading";
import Paragraph from "grommet/components/Paragraph";
import Article from "grommet/components/Article";
import Box from "grommet/components/Box";
import { withRouter } from "react-router";

type Props = {
	heading: React.Node,
	subheading?: React.Node,
	children: React.Node,
	location: any
};

class ContentBox extends React.Component<Props> {
	render() {
		return (
			<Article pad="medium">
				<Heading tag="h2" margin="none" pad="medium">
					{this.props.heading}
				</Heading>
				<Paragraph margin="none">{this.props.subheading}</Paragraph>
				<Box>{this.props.children}</Box>
			</Article>
		);
	}
}

export default withRouter(ContentBox);
