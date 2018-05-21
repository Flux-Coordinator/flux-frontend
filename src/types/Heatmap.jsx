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
