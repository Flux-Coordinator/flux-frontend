// @flow
import * as React from "react";

type State = {
	hasError: boolean
};

type Props = {
	children: React.Node
};

export default class ErrorBoundary extends React.Component<Props, State> {
	state = {
		hasError: false
	};

	logErrorToMyService = (error: Error, info: string) => {
		console.error(error, info);
	};

	componentDidCatch(error: Error, info: string) {
		// Display fallback UI
		this.setState({ hasError: true });
		// You can also log the error to an error reporting service
		this.logErrorToMyService(error, info);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}
		return this.props.children;
	}
}
