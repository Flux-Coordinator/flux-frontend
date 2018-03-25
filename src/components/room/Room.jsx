// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Section from "grommet/components/Section";
import Box from "grommet/components/Box";
import Image from "grommet/components/Image";
import Paragraph from "grommet/components/Paragraph";

import RoomModel from "../../models/Room";
import placeholder from "../../images/placeholder.png";

type Props = {
	room: RoomModel
};

export default function Room({ room }: Props) {
	return (
		<Box pad="small">
			<Section>
				<Header size="small">
					<Title>Beschreibung</Title>
				</Header>
				<Paragraph margin="none">
					Name: {room.name ? room.name : "Raum hat keinen Namen"}
				</Paragraph>
				<Paragraph margin="none">
					Beschreibung:{" "}
					{room.description ? room.description : "Keine Beschreibung"}
				</Paragraph>
				<Paragraph margin="none">
					Länge: {room.length ? room.length : "Keine Länge vorhanden"}
				</Paragraph>
				<Paragraph margin="none">
					Breite: {room.width ? room.width : "Keine Breite vorhanden"}
				</Paragraph>
			</Section>
			<Section>
				<Header size="small">
					<Title>Messungen</Title>
				</Header>
			</Section>
			<Section>
				<Header size="small">
					<Title>Grundriss</Title>
				</Header>
				<Image src={placeholder} size="large" />
			</Section>
		</Box>
	);
}
