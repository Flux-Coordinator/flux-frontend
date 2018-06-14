// @flow
import Reading from "./Reading";
import Anchor from "./Anchor";
import Transformation from "./Transformation";
import type { MeasurementState } from "./../types/MeasurementState";

type ConstructorType = {
	measurementId: number,
	name: string,
	description: string,
	startDate: ?Date,
	endDate: ?Date,
	measurementState: MeasurementState,
	xOffset: number,
	yOffset: number,
	scaleFactor: number,
	creator?: string,
	readings?: Reading[],
	anchorPositions?: Anchor[],
	roomId: number,
	projectId: number
};

export default class Measurement {
	measurementId: ?number;
	name: string;
	description: string;
	startDate: ?Date;
	endDate: ?Date;
	measurementState: MeasurementState;
	transformation: Transformation;
	creator: string;
	readings: Reading[];
	anchors: Anchor[];
	roomId: ?number;
	projectId: ?number;

	constructor(
		measurementId?: number,
		name: string,
		description: string,
		xOffset: number,
		yOffset: number,
		scaleFactor: number = 1.0,
		startDate?: ?Date = null,
		endDate?: ?Date = null,
		measurementState?: MeasurementState = "READY",
		creator?: string = "",
		readings?: Reading[] = [],
		anchors?: Anchor[] = [],
		roomId?: number,
		projectId?: number
	) {
		this.measurementId = measurementId;
		this.name = name;
		this.description = description;
		this.measurementState = measurementState;
		this.transformation = new Transformation(xOffset, yOffset, scaleFactor);
		this.creator = creator;
		this.readings = readings;
		this.anchors = anchors;
		this.roomId = roomId;
		this.projectId = projectId;

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
		name,
		description,
		startDate,
		endDate,
		measurementState,
		xOffset,
		yOffset,
		scaleFactor,
		creator,
		readings,
		anchorPositions,
		roomId,
		projectId
	}: ConstructorType) {
		const typedReadings: Reading[] = [];
		if (readings != null) {
			readings.forEach(r => {
				typedReadings.push(Reading.fromObject((r: any)));
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
			name,
			description,
			xOffset,
			yOffset,
			scaleFactor,
			startDate,
			endDate,
			measurementState,
			creator,
			typedReadings,
			typedAnchors,
			roomId,
			projectId
		);
	}

	toDto = () => {
		const anchorPositions = this.anchors.map(a => a.toAnchorPositionObject());
		const readingDtos = this.readings.map(r => r.toDTO());
		const exportMeasurement = Object.assign({}, this, {
			anchorPositions,
			readings: readingDtos,
			...this.transformation
		});
		exportMeasurement.anchors = undefined;
		return exportMeasurement;
	};
}
