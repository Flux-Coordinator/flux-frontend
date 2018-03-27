// @flow
import * as React from "react";
import Status from "grommet/components/icons/Status";
import Header from "grommet/components/Header";
import Article from "grommet/components/Article";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";

export default function Welcome() {
	return (
		<Article pad="medium">
			<Header>
				<Heading tag="h2">Dashboard</Heading>
			</Header>
			<Box>
				<Box basis="1/2">
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
			</Box>
		</Article>
	);
}
