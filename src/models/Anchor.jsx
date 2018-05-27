// @flow
import PositionModel from "./Position";
import { Positionable } from "../types/Positionable";

type ConstructorType = {
	anchorId: ?number,
	networkId: string,
	xposition: number,
	yposition: number,
	zposition: number
};

export default class Anchor implements Positionable {
	anchorId: ?number;
	networkId: string;
	position: PositionModel;
	getValue = () => (this.networkId ? parseInt(this.networkId, 16) : 0);

	constructor(
		anchorId: ?number,
		networkId: string,
		xposition: number,
		yposition: number,
		zposition: number
	) {
		this.anchorId = anchorId;
		this.networkId = networkId;
		this.position = new PositionModel(xposition, yposition, zposition);
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

	toAnchorPositionObject = () => {
		return {
			anchorPositionId: this.anchorId,
			xposition: this.position.xposition,
			yposition: this.position.yposition,
			zposition: this.position.zposition,
			anchor: {
				anchorId: 0,
				networkid: this.networkId
			}
		};
	};
}
