// @flow

export type ConfigObject = {
	container?: ?Element | Text,
	radius: ?number,
	maxOpacity: ?number,
	minOpacity: ?number,
	blur: ?number
};

export type HeatmapDataPoint = {
	x: number,
	y: number,
	value: number
};

export type Container = {
	height: number,
	width: number
};
