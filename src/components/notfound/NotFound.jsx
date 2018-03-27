// @flow
import * as React from "react";
import Heading from "grommet/components/Heading";

type Props = {
	info: string
};

function NotFound({ info }: Props) {
	return (
		<React.Fragment>
			<Heading>Error: Route not found!</Heading>
			<Heading>{info}</Heading>
		</React.Fragment>
	);
}

export default NotFound;
