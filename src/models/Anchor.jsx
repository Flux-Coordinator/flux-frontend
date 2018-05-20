// @flow

type ConstructorType = {
	anchorId: ?number,
	networkId: string,
	xposition: number,
	yposition: number,
	zposition: number
};

export default class Anchor {
	anchorId: ?number;
	networkId: string;
	xposition: number;
	yposition: number;
	zposition: number;

	constructor(
		anchorId: ?number,
		networkId: string,
		xposition: number,
		yposition: number,
		zposition: number
	) {
		this.anchorId = anchorId;
		this.networkId = networkId;
		this.xposition = xposition;
		this.yposition = yposition;
		this.zposition = zposition;
	}

	static fromObject({
		anchorId,
		networkId,
		xposition,
		yposition,
		zposition
	}: ConstructorType) {
		return new Anchor(anchorId, networkId, xposition, yposition, zposition);
	}
}
