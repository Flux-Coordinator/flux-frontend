// @flow
import Reading from "./Reading";
import Anchor from "./Anchor";

type ConstructorType = {
	measurementId: number,
	description: string,
	startDate: Date,
	endDate: Date,
	measurementState: string,
	readings?: Reading[],
	anchorPositions?: Anchor[]
};

export default class Measurement {
	measurementId: number;
	description: string;
	startDate: Date;
	endDate: Date;
	state: string;
	readings: Reading[];
	anchors: Anchor[];

	constructor(
		measurementId: number,
		description: string,
		startDate: Date,
		endDate: Date,
		state: string,
		readings?: Reading[],
		anchors?: Anchor[]
	) {
		this.measurementId = measurementId;
		this.description = description;
		this.state = state;

		if (readings) {
			this.readings = readings;
		} else {
			this.readings = [];
		}

		if (anchors) {
			this.anchors = anchors;
		} else {
			this.anchors = [];
		}

		if (typeof startDate === "number" || typeof startDate === "string") {
			this.startDate = new Date(startDate);
		} else {
			this.startDate = startDate;
		}

		if (typeof endDate === "number" || typeof endDate === "string") {
			this.endDate = new Date(endDate);
		} else {
			this.endDate = endDate;
		}
	}

	static fromObject({
		measurementId,
		description,
		startDate,
		endDate,
		measurementState,
		readings,
		anchorPositions
	}: ConstructorType) {
		const typedReadings: Reading[] = [];
		if (readings != null) {
			readings.forEach(r => {
				typedReadings.push(Reading.fromObject(r));
			});
		}

		const typedAnchors: Anchor[] = [];
		if (anchorPositions != null) {
			anchorPositions.forEach((a: any) => {
				typedAnchors.push(
					new Anchor(
						a.anchorPositionId,
						a.anchor.networkId,
						a.xposition,
						a.yposition,
						a.zposition
					)
				);
			});
		}

		return new Measurement(
			measurementId,
			description,
			startDate,
			endDate,
			measurementState,
			typedReadings,
			typedAnchors
		);
	}
}
