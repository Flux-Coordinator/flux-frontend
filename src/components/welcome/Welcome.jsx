import * as React from "react";
import { Typography } from "material-ui";

export default function Welcome() {
	return (
		<React.Fragment>
			<Typography variant={"headline"}>Welcome to Flux-Coordinator!</Typography>
			<Typography variant={"subheading"}>
				We are working on building something great!
			</Typography>
		</React.Fragment>
	);
}
