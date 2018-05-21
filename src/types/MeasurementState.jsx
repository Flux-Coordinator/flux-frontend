// @flow
const states = {
	READY: "READY",
	RUNNING: "RUNNING",
	DONE: "DONE"
};

export type MeasurementState = $Keys<typeof states>;
