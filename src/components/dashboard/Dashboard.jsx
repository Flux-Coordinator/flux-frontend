// @flow
import * as React from "react";
import Status from "grommet/components/icons/Status";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import Card from "grommet/components/Card";

import ContentBox from "./../contentBox/ContentBox";
import Measurement from "./../../models/Measurement";

type Props = {
	serverReachable: boolean,
	activeMeasurement?: Measurement
};

function ServerStatus({ serverReachable }: { serverReachable: boolean }) {
	let description = (
		<Box>
			<Status size="small" value="disabled" /> Nicht verfügbar
		</Box>
	);
	if (serverReachable) {
		description = (
			<Box>
				<Status size="small" value="ok" /> Bereit
			</Box>
		);
	}

	return (
		<Card
			label="Status"
			heading="Server"
			headingStrong={false}
			textSize="xsmall"
			colorIndex="neutral-1-t"
			description={description}
		/>
	);
}

function ActiveMeasurement({
	activeMeasurement
}: {
	activeMeasurement?: Measurement
}) {
	let description = <Box>Keine aktive Messung</Box>;
	let link;

	if (activeMeasurement) {
		description = <Box>{activeMeasurement.name}</Box>;
	}

	return (
		<Card
			label="Aktive"
			heading="Messung"
			headingStrong={false}
			textSize="xsmall"
			colorIndex="neutral-1-t"
			link={link}
			description={description}
		/>
	);
}

export default function Dashboard({
	serverReachable,
	activeMeasurement
}: Props) {
	return (
		<ContentBox heading="Dashboard">
			<Box>
				<Header size="small">
					<Heading tag="h3">Systemstatus</Heading>
				</Header>
				<Tiles flush={false}>
					<Tile>
						<ServerStatus serverReachable={serverReachable} />
					</Tile>
					<Tile>
						<Card
							label="Status"
							heading="Sensor"
							headingStrong={false}
							textSize="xsmall"
							colorIndex="neutral-1-t"
							description={""}
						/>
					</Tile>
					<Tile>
						<ActiveMeasurement activeMeasurement={activeMeasurement} />
					</Tile>
				</Tiles>

				{/* <div>Platform: Cloud</div>
				<div>
					Status: Bereit <Status size="small" value="ok" />
				</div>
				<div>
					Sensoren:
					<ul>
						<li>Pozyx</li>
						<li>Lux Meter</li>
					</ul>
				</div> */}
			</Box>
		</ContentBox>
	);
}
