// @flow
import * as React from "react";
import { mousePositionHandler } from "../../utils/MousePositionHandler";
import BrowserPosition from "../../models/BrowserPosition";
import HeatmapDataPoint from "../../models/HeatmapDataPoint";
import type { HeatmapMode } from "../../types/Heatmap";

const TOOLTIP_CURSOR_DISTANCE = 15;

type Props = {
	children: React.Node,
	heatmapMode: HeatmapMode,
	getValueCallback: BrowserPosition => number
};

export default class HeatmapTooltip extends React.Component<Props> {
	heatmapTooltip: ?HTMLDivElement;

	onMouseMove = (mousePosition: BrowserPosition) => {
		let value = this.props.getValueCallback(
			new BrowserPosition(mousePosition.xposition, mousePosition.yposition)
		);
		if (!(this.props.heatmapMode === "ANCHORS" && value === 0)) {
			this.updateTooltip(
				new HeatmapDataPoint(
					mousePosition.xposition,
					mousePosition.yposition,
					value
				)
			);
			this.showTooltip();
		} else {
			this.hideTooltip();
		}
	};

	onMouseOut = () => {
		this.hideTooltip();
	};

	updateTooltip = (dataPoint: HeatmapDataPoint) => {
		this.positionTooltip(
			dataPoint.x + TOOLTIP_CURSOR_DISTANCE,
			dataPoint.y + TOOLTIP_CURSOR_DISTANCE
		);
		let heatmapValue = dataPoint.value.toString();
		if (this.props.heatmapMode === "ANCHORS") {
			heatmapValue = "0x" + dataPoint.value.toString(16);
		}
		this.setTooltipValue(heatmapValue);
	};

	positionTooltip = (xPosition: number, yPosition: number) => {
		if (this.heatmapTooltip != null) {
			this.heatmapTooltip.style.webkitTransform =
				"translate(" + xPosition + "px, " + yPosition + "px)";
		}
	};

	setTooltipValue = (heatmapValue: string) => {
		if (this.heatmapTooltip != null) {
			this.heatmapTooltip.innerHTML = heatmapValue;
		}
	};

	showTooltip = () => {
		if (this.heatmapTooltip != null) {
			this.heatmapTooltip.style.display = "block";
		}
	};

	hideTooltip = () => {
		if (this.heatmapTooltip != null) {
			this.heatmapTooltip.style.display = "none";
		}
	};

	render() {
		return (
			<div
				id={"testwrapper"}
				style={{ position: "relative" }}
				onMouseMove={mousePositionHandler(this.onMouseMove)}
				onMouseOut={this.onMouseOut}
			>
				{this.props.children}
				<div
					ref={heatmapTooltip => (this.heatmapTooltip = heatmapTooltip)}
					style={{
						display: "none",
						position: "absolute",
						top: 0,
						left: 0,
						background: "rgba(0,0,0,.8)",
						color: "#fff",
						padding: "5px"
					}}
				>
					0
				</div>
			</div>
		);
	}
}
