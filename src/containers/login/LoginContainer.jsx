// @flow
import * as React from "react";
import LoginForm from "grommet/components/LoginForm";
import Box from "grommet/components/Box";
import Image from "grommet/components/Image";

import Img from "../../images/logo.svg";

type Props = {};

type LoginType = {
	username: string,
	password: string,
	rememberMe: boolean
};

export default class LoginContainer extends React.Component<Props> {
	onSubmit = (login: LoginType) => {};

	render() {
		return (
			<Box full align="center">
				<LoginForm
					rememberMe
					title="Flux Coordinator"
					onSubmit={this.onSubmit}
					secondaryText="Login"
					usernameType="text"
					logo={<Image size="small" src={Img} />}
				/>
			</Box>
		);
	}
}
