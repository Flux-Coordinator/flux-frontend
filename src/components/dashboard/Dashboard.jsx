// @flow
import * as React from "react";
import Status from "grommet/components/icons/Status";
import Header from "grommet/components/Header";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";

import ContentBox from "../contentBox/ContentBox";

export default function Dashboard() {
	return (
		<ContentBox heading="Dashboard">
			<Box>
				<Header size="small">
					<Heading tag="h3">Systemstatus</Heading>
				</Header>
				<div>Platform: Cloud</div>
				<div>
					Status: Bereit <Status size="small" value="ok" />
				</div>
				<div>
					Sensoren:
					<ul>
						<li>Pozyx</li>
						<li>Lux Meter</li>
					</ul>
				</div>
			</Box>
		</ContentBox>
	);
}
