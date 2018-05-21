// @flow
import HeatmapDataPoint from "./HeatmapDataPoint";

export default class HeatmapData {
	min: number;
	max: number;
	data: HeatmapDataPoint[];

	constructor(min: number, max: number, data: HeatmapDataPoint[]) {
		this.min = min;
		this.max = max;
		this.data = data;
	}
}
