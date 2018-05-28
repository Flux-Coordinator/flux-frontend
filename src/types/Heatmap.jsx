// @flow

export type ConfigObject = {
	container?: ?Element | Text,
	radius?: number,
	maxOpacity?: number,
	minOpacity?: number,
	opacity?: number,
	blur?: number,
	gradient?: Object
};

export type Container = {
	height: number,
	width: number,
	originalHeight: number,
	originalWidth: number,
	loaded: boolean
};

const heatmapModes = {
	DEFAULT: "DEFAULT",
	COVERAGE: "COVERAGE",
	ANCHORS: "ANCHORS"
};

export type HeatmapMode = $Keys<typeof heatmapModes>;
