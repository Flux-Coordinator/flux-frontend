// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Article from "grommet/components/Article";
import Box from "grommet/components/Box";
import { withRouter } from "react-router";

import Toast from "./../toast/Toast";

import type { ToastMetadata } from "./../toast/Toast";

type Props = {
	heading: React.Node,
	children: React.Node,
	location: any
};

type State = {
	toast?: ToastMetadata
};

class ContentBox extends React.Component<Props, State> {
	state = {};

	render() {
		const toast = this.props.location.state
			? this.props.location.state.toast
			: undefined;
		return (
			<Article pad="medium">
				<Header justify="between">
					<Heading tag="h2" margin="none" pad="medium">
						{this.props.heading}
					</Heading>
				</Header>
				<Box>{this.props.children}</Box>
				<Toast
					metadata={toast}
					onClose={() => this.setState({ toast: undefined })}
				/>
			</Article>
		);
	}
}

export default withRouter(ContentBox);
