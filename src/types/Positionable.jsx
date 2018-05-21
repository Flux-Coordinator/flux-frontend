// @flow
import PositionModel from "../models/Position";

export interface Positionable {
	position: PositionModel;
	getValue?: () => number;
}
