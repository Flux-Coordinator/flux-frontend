// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Paragraph from "grommet/components/Paragraph";

import MeasurementModel from "../../models/Measurement";
import ReadingModel from "../../models/Reading";

type Props = {
	currentMeasurement: MeasurementModel,
	readings: ?(ReadingModel[])
};

export default function MeasurementSummary({
	currentMeasurement,
	readings
}: Props) {
	return (
		<Section>
			<Header size="small">
				<Heading tag="h3">Aktuelle Messung</Heading>
			</Header>
			<Box>
				<Paragraph>Messung ID: {currentMeasurement.measurementId}</Paragraph>
				{readings && <Paragraph>Anzahl Messungen: {readings.length}</Paragraph>}
			</Box>
		</Section>
	);
}
