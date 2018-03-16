// @flow
import React from "react";
import CssBaseline from "material-ui/CssBaseline/CssBaseline";

import Layout from "./Layout";

function App() {
	return (
		<div className="App">
			<CssBaseline />
			<Layout>
				<p>Hallo!</p>
			</Layout>
		</div>
	);
}

export default App;
