// @flow

export type ConfigObject = {
	container?: ?Element | Text,
	radius?: number,
	maxOpacity?: number,
	minOpacity?: number,
	blur?: number
};

export type HeatmapModes = {
	showCoverage: boolean,
	showAnchors: boolean
};

export type Container = {
	height: number,
	width: number,
	originalHeight: number,
	originalWidth: number,
	loaded: boolean
};
