// @flow
import * as React from "react";
import "./App.css";
import Layout from "./Layout";

class App extends React.Component<{}> {
	render() {
		return (
			<div className="App">
				<Layout>
					<p>Hallo!</p>
				</Layout>
			</div>
		);
	}
}

export default App;
