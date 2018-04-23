// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";

import MeasurementModel from "../../models/Measurement";

type Props = {
    currentMeasurement: MeasurementModel
}

export default function MeasurementSummary({ currentMeasurement } : Props) {
    return (
        <Section>
            <Header size="small">
                <Heading tag="h3">Aktuelle Messung</Heading>
            </Header>
            <Box>{currentMeasurement.measurementId}</Box>
        </Section>
    )
}