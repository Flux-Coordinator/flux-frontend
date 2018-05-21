// @flow

export default class HeatmapDataPoint {
	x: number;
	y: number;
	value: number;

	constructor(x: number, y: number, value: number) {
		this.x = x;
		this.y = y;
		this.value = value;
	}
}
