// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import Section from "grommet/components/Section";
import Article from "grommet/components/Article";
import Image from "grommet/components/Image";

import RoomModel from "../../models/Room";
import MeasurementList from "../measurements/MeasurementsList";
import placeholder from "../../images/placeholder.png";

type Props = {
	room: RoomModel
};

export default function Room({ room }: Props) {
	return (
		<Article pad="medium">
			<Section pad="none">
				<Header justify="between">
					<Heading tag="h2" margin="none" pad="medium">
						Raumbeschreibung
					</Heading>
				</Header>
				<Tiles fill>
					<Tile pad="medium">
						<Header size="small" justify="center">
							<Heading tag="h3">Beschreibung</Heading>
						</Header>
						<div>Name: {room.name ? room.name : "Raum hat keinen Namen"}</div>
						<div>
							Länge: {room.length ? room.length : "Keine Länge vorhanden"}
						</div>
						<div>
							Breite: {room.width ? room.width : "Keine Breite vorhanden"}
						</div>
					</Tile>
					<Tile pad="medium" />
					<Tile pad="medium">
						<Header size="small" justify="center">
							<Heading tag="h3">Grundriss</Heading>
						</Header>
						<Image src={placeholder} size="large" />
					</Tile>
				</Tiles>
			</Section>
			<Section>
				<Header size="small" justify="center">
					<Heading tag="h3">Messungen</Heading>
				</Header>
				<MeasurementList measurements={room.measurements} />
			</Section>
		</Article>
	);
}
