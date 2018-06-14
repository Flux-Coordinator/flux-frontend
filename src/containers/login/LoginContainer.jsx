// @flow
import * as React from "react";
import axios, { CancelToken, CancelTokenSource } from "axios";
import LoginForm from "grommet/components/LoginForm";
import Box from "grommet/components/Box";
import Image from "grommet/components/Image";
import { Redirect } from "react-router-dom";

import Img from "../../images/logo.svg";
import AuthenticationService from "./../../utils/AuthenticationService";

type Props = {};

type LoginType = {
	username: string,
	password: string,
	rememberMe: boolean
};

type State = {
	isLoading: boolean,
	shouldRedirect: boolean,
	errors: string[]
};

export default class LoginContainer extends React.Component<Props, State> {
	source: CancelTokenSource = CancelToken.source();

	state = {
		isLoading: false,
		shouldRedirect: false,
		errors: []
	};

	onSubmit = (login: LoginType) => {
		this.setState({ isLoading: true });

		axios
			.post(
				"/login",
				{
					username: login.username,
					password: login.password
				},
				{ cancelToken: this.source.token }
			)
			.then(result => {
				AuthenticationService.login(result.data, login.rememberMe);
				axios.defaults.headers.common["Authorization"] =
					AuthenticationService.token;
				this.setState({ shouldRedirect: true });
			})
			.catch(error => {
				if (!axios.isCancel(error)) {
					// TODO: What do we want to do if there was an error fetching the projects?
				}
				const errorMessage =
					"Fehler beim Einloggen. Haben Sie eine Internetverbindung?";
				this.setState({
					isLoading: false,
					shouldRedirect: false,
					errors: [errorMessage]
				});
			});
	};

	render() {
		return (
			<Box full align="center">
				<LoginForm
					errors={this.state.errors}
					rememberMe
					title="Flux Coordinator"
					onSubmit={!this.state.isLoading ? this.onSubmit : null}
					secondaryText="Login"
					usernameType="text"
					logo={<Image size="small" src={Img} />}
				/>
				{this.state.shouldRedirect && (
					<Redirect
						to={{
							pathname: "/"
						}}
					/>
				)}
			</Box>
		);
	}
}
