// @flow
import * as React from "react";
import { mousePositionHandler } from "../../utils/MousePositionHandler";
import BrowserPosition from "../../models/BrowserPosition";
import HeatmapDataPoint from "../../models/HeatmapDataPoint";

const TOOLTIP_CURSOR_DISTANCE = 15;

type Props = {
	children: React.Node,
	getValueCallback: BrowserPosition => number
};

export default class HeatmapTooltip extends React.Component<Props> {
	heatmapTooltip: ?HTMLDivElement;

	onMouseMove = (mousePosition: BrowserPosition) => {
		let value = this.props.getValueCallback(
			new BrowserPosition(mousePosition.xposition, mousePosition.yposition)
		);
		this.showTooltip();
		this.updateTooltip(
			new HeatmapDataPoint(
				mousePosition.xposition,
				mousePosition.yposition,
				value
			)
		);
	};

	onMouseOut = () => {
		this.hideTooltip();
	};

	updateTooltip = (dataPoint: HeatmapDataPoint) => {
		if (this.heatmapTooltip != null) {
			this.heatmapTooltip.style.webkitTransform =
				"translate(" +
				(dataPoint.x + TOOLTIP_CURSOR_DISTANCE) +
				"px, " +
				(dataPoint.y + TOOLTIP_CURSOR_DISTANCE) +
				"px)";
			this.heatmapTooltip.innerHTML = dataPoint.value.toString();
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
