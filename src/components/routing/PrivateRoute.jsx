// @flow
import * as React from "react";
import { Route, Redirect } from "react-router-dom";

import AuthenticationService from "./../../utils/AuthenticationService";

export default function PrivateRoute({ component: Component, ...rest }: any) {
	return (
		<Route
			{...rest}
			render={props =>
				AuthenticationService.isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
}
