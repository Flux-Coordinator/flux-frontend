// @flow
import * as React from "react";
import { Typography } from "material-ui";

type Props = {
	info: string
};

function NotFound({ info }: Props) {
	return (
		<React.Fragment>
			<Typography variant={"headline"}>Error: Route not found!</Typography>
			<Typography variant={"subheading"}>{info}</Typography>
		</React.Fragment>
	);
}

export default NotFound;
