// @flow
import * as React from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
	return true;
};

export default function PrivateRoute({ component: Component, ...rest }: any) {
	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
}
