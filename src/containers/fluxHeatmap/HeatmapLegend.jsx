// @flow

import * as React from "react";
import HeatmapData from "../../models/HeatmapData";

type Props = {
	heatmapGradient: Object,
	heatmapData: HeatmapData
};

type State = {
	legendGradient: string
};

export default class HeatmapLegend extends React.Component<Props, State> {
	state = {
		legendGradient: ""
	};

	heatmapGradient = {};
	legendCanvas: ?HTMLCanvasElement;
	legendContext: ?CanvasRenderingContext2D;

	componentDidMount() {
		this.createLegend();
		this.updateLegend();
	}

	componentDidUpdate() {
		this.updateLegend();
	}

	createLegend = () => {
		this.legendCanvas = document.createElement("canvas");
		this.legendCanvas.width = 100;
		this.legendCanvas.height = 10;
		this.legendContext = this.legendCanvas.getContext("2d");
	};

	updateLegend = () => {
		if (this.legendContext != null && this.legendCanvas != null) {
			const legendContext = this.legendContext;
			const legendCanvas = this.legendCanvas;

			if (this.props.heatmapGradient !== this.heatmapGradient) {
				this.heatmapGradient = this.props.heatmapGradient;
				let legendCanvasGradient = legendContext.createLinearGradient(
					0,
					0,
					100,
					1
				);
				for (let key in this.heatmapGradient) {
					if (this.heatmapGradient.hasOwnProperty(key)) {
						legendCanvasGradient.addColorStop(
							parseFloat(key),
							(this.heatmapGradient: any)[key]
						);
					}
				}
				legendContext.fillStyle = legendCanvasGradient;
				legendContext.fillRect(0, 0, 100, 10);
				this.setState({ legendGradient: legendCanvas.toDataURL() });
			}
		}
	};

	render() {
		return (
			<div>
				<span style={{ float: "left" }}>
					{Math.round(this.props.heatmapData.min)}
				</span>
				<span style={{ float: "right" }}>
					{Math.round(this.props.heatmapData.max)}
				</span>
				<img
					src={this.state.legendGradient}
					alt={""}
					style={{ width: "100%", height: "15px" }}
				/>
			</div>
		);
	}
}
