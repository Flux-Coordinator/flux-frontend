// @flow
import * as React from "react";
import Status from "grommet/components/icons/Status";
import Anchor from "grommet/components/Anchor";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import Card from "grommet/components/Card";

import ContentBox from "./../contentBox/ContentBox";
import Measurement from "./../../models/Measurement";

import type { ServerState } from "./../../types/ServerState";

type Props = {
	serverState: ServerState,
	activeMeasurement?: ?Measurement
};

type DefaultCardProps = {
	label: string,
	heading: string,
	children: React.Node,
	anchorPath?: string,
	anchorLabel?: React.Node
};

function DefaultCard({
	label,
	heading,
	children,
	anchorPath,
	anchorLabel
}: DefaultCardProps) {
	const grommetCardProps = { label, heading };
	let link;
	if (anchorPath) {
		link = <Anchor path={anchorPath} primary label={anchorLabel} />;
	}

	return (
		<Card
			description={children}
			link={link}
			headingStrong={false}
			responsive={false}
			textSize="xsmall"
			basis="full"
			colorIndex="neutral-1-t"
			{...grommetCardProps}
		/>
	);
}

function ServerStatus({ serverState }: { serverState: ServerState }) {
	let description: React.Node;
	switch (serverState.connectionState) {
		case "CONNECTED":
			description = (
				<Box pad={{ between: "small" }}>
					<Box direction="row" responsive={false}>
						<Status size="small" value="ok" /> Bereit
					</Box>
					<Box>URI: {serverState.uri}</Box>
				</Box>
			);
			break;
		case "DISCONNECTED":
			description = (
				<Box pad={{ between: "small" }}>
					<Box direction="row" responsive={false}>
						<Status size="small" value="disabled" /> Nicht verfügbar
					</Box>
					<Box>URI: {serverState.uri}</Box>
				</Box>
			);
			break;
		default:
			description = (
				<Box pad={{ between: "small" }}>
					<Box direction="row" responsive={false}>
						<Status size="small" value="unknown" /> Unbekannt
					</Box>
					<Box>URI: {serverState.uri}</Box>
				</Box>
			);
			break;
	}

	return (
		<DefaultCard label="Status" heading="Server">
			{description}
		</DefaultCard>
	);
}

function ActiveMeasurement({
	activeMeasurement
}: {
	activeMeasurement?: ?Measurement
}) {
	let description = <Box>Keine aktive Messung</Box>;
	let link: string;

	if (activeMeasurement) {
		description = (
			<Box pad={{ vertical: "small" }}>{activeMeasurement.name}</Box>
		);
		const { projectId, roomId, measurementId } = activeMeasurement;
		if (projectId && roomId && measurementId) {
			link = `/projects/${projectId}/rooms/${roomId}/measurements/${measurementId}`;
		}
	}

	return (
		<DefaultCard
			label="Aktive"
			heading="Messung"
			anchorLabel="Zur Messung"
			anchorPath={link}
		>
			{description}
		</DefaultCard>
	);
}

function SensorStatus({ sensorReachable }: { sensorReachable: boolean }) {
	let description = (
		<Box direction="row">
			<Status size="small" value="disabled" /> Nicht verfügbar
		</Box>
	);
	if (sensorReachable) {
		description = (
			<Box direction="row">
				<Status size="small" value="ok" /> Bereit
			</Box>
		);
	}

	return (
		<DefaultCard label="Status" heading="Sensor">
			{description}
		</DefaultCard>
	);
}

export default function Dashboard({ serverState, activeMeasurement }: Props) {
	return (
		<ContentBox heading="Dashboard">
			<Box>
				<Header size="small">
					<Heading tag="h3">Systemstatus</Heading>
				</Header>
				<Tiles flush={false}>
					<Tile>
						<ServerStatus serverState={serverState} />
					</Tile>
					<Tile>
						<SensorStatus sensorReachable={false} />
					</Tile>
					<Tile>
						<ActiveMeasurement activeMeasurement={activeMeasurement} />
					</Tile>
				</Tiles>
			</Box>
		</ContentBox>
	);
}
