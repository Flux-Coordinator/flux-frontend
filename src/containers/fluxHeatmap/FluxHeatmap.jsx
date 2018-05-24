// @flow
import * as React from "react";
import Heatmap from "heatmapjs/build/heatmap.js";
import ReadingModel from "../../models/Reading";
import AnchorModel from "../../models/Anchor";
import HeatmapDataPoint from "../../models/HeatmapDataPoint";
import HeatmapData from "../../models/HeatmapData";
import { Positionable } from "../../types/Positionable";
import ReactResizeDetector from "react-resize-detector";
import Transformation from "../../models/Transformation";
import type {
	ConfigObject,
	Container,
	HeatmapModes
} from "../../types/Heatmap";
import Box from "grommet/components/Box";
import { PLACEHOLDER_IMAGE } from "../../images/ImagesBase64";

const FIXED_HEATMAP_VALUE = 1;

type Props = {
	readings: ReadingModel[],
	anchors: AnchorModel[],
	backgroundImage: string,
	configObject: ConfigObject,
	transformation: Transformation,
	heatmapModes: HeatmapModes
};

type State = {
	container: Container
};

export default class FluxHeatmap extends React.Component<Props, State> {
	static defaultProps = {
		readings: [],
		anchors: [],
		backgroundImage: PLACEHOLDER_IMAGE,
		configObject: {
			radius: 1000,
			maxOpacity: 0.5,
			minOpacity: 0,
			blur: 0.75,
			gradient: {
				"0.25": "rgb(0,0,255)",
				"0.55": "rgb(0,255,0)",
				"0.85": "yellow",
				"1.0": "rgb(255,0,0)"
			}
		},
		transformation: new Transformation(),
		heatmapModes: {
			showCoverage: false,
			showAnchors: false
		}
	};

	state = {
		container: {
			height: 1,
			width: 1,
			originalHeight: 1,
			originalWidth: 1,
			loaded: false
		}
	};

	gradientCfg = {};
	legendCanvas;
	legendContext;
	heatmap: Heatmap;
	heatmapContainer: ?HTMLDivElement;
	heatmapTooltip: ?HTMLDivElement;
	heatmapLegend: ?HTMLDivElement;
	heatmapLegendMin: ?HTMLSpanElement;
	heatmapLegendMax: ?HTMLSpanElement;
	heatmapGradient: ?HTMLImageElement;
	imgElement: ?HTMLImageElement;

	componentDidMount() {
		this.createLegend();
		this.heatmap = this.createHeatmapInstance(
			this.transformConfig(this.props.configObject)
		);
		this.setData();
	}

	createHeatmapInstance = (configObject: ConfigObject): Heatmap => {
		const extendedConfigObject: ConfigObject = Object.assign(
			{},
			{
				container: this.heatmapContainer
			},
			configObject
		);
		return Heatmap.create(extendedConfigObject);
	};

	destroyHeatmapInstance = (heatmapInstance: Heatmap): HeatmapDataPoint[] => {
		// destroy function not supported from Heatmap.js, but needed due to a bug on config change:
		// https://github.com/pa7/heatmap.js/issues/209
		const currentData = heatmapInstance.getData();
		const canvas = heatmapInstance._renderer.canvas;
		canvas.remove();
		return currentData;
	};

	componentDidUpdate() {
		this.setConfig();
		this.setData();
	}

	setContainerState = () => {
		if (this.imgElement != null) {
			this.setState({
				container: {
					height: this.imgElement.clientHeight,
					width: this.imgElement.clientWidth,
					originalHeight: this.imgElement.naturalHeight,
					originalWidth: this.imgElement.naturalWidth,
					loaded: true
				}
			});
		}
	};

	setData = () => {
		if (this.state.container.loaded) {
			if (this.props.heatmapModes.showAnchors) {
				const dataPoints = this.transformData(this.props.anchors, true);
				this.heatmap.setData(new HeatmapData(0, 1, dataPoints));
			} else if (this.props.readings.length > 0) {
				const dataPoints = this.transformData(
					this.props.readings,
					this.props.heatmapModes.showCoverage
				);
				const max = this.computeMax(dataPoints);
				const heatmapData = new HeatmapData(0, max, dataPoints);
				this.heatmap.setData(heatmapData);
				this.updateLegend(heatmapData);
			}
		}
	};

	setConfig = () => {
		if (this.state.container.loaded) {
			let configObject = this.transformConfig(this.props.configObject);
			if (this.props.heatmapModes.showAnchors) {
				configObject = {
					radius: 3,
					opacity: 1,
					blur: 0,
					gradient: {
						"1": "red"
					}
				};
			}
			const currentData = this.destroyHeatmapInstance(this.heatmap);
			this.heatmap = this.createHeatmapInstance(configObject);
			this.heatmap.setData(currentData);
		}
	};

	computeMax = (dataPoints: HeatmapDataPoint[]) => {
		return Math.max(...dataPoints.map(d => d.value));
	};

	transformData = (
		elements: Positionable[],
		fixedValue: boolean
	): HeatmapDataPoint[] => {
		const container = this.state.container;
		const transformation = this.props.transformation;
		const containerScaleFactor = container.width / container.originalWidth;
		return elements.reduce(function(transformedReadings, element) {
			const x = Math.round(
				(element.position.xposition * transformation.scaleFactor +
					transformation.xOffset) *
					containerScaleFactor
			);
			const y =
				container.height -
				Math.round(
					(element.position.yposition * transformation.scaleFactor +
						transformation.yOffset) *
						containerScaleFactor
				);
			let value = FIXED_HEATMAP_VALUE;
			if (!fixedValue && element.getValue != null) {
				value = element.getValue();
			}
			if (x >= 0 && y >= 0 && x <= container.width && y <= container.height) {
				transformedReadings.push(new HeatmapDataPoint(x, y, value));
			}
			return transformedReadings;
		}, []);
	};

	transformConfig = (configObject: ConfigObject): ConfigObject => {
		if (configObject.radius != null) {
			const container = this.state.container;
			const transformation = this.props.transformation;
			const containerScaleFactor = container.width / container.originalWidth;
			let radius =
				configObject.radius * transformation.scaleFactor * containerScaleFactor;
			if (radius <= 0.5) {
				radius = 0.5;
			}
			return Object.assign(
				{},
				FluxHeatmap.defaultProps.configObject,
				configObject,
				{ radius: radius }
			);
		}
		return configObject;
	};

	createLegend = () => {
		this.legendCanvas = document.createElement("canvas");
		this.legendCanvas.width = 100;
		this.legendCanvas.height = 10;
		this.legendContext = this.legendCanvas.getContext("2d");
	};

	updateLegend = (data: HeatmapData) => {
		this.heatmapLegendMin.innerHTML = "0";
		this.heatmapLegendMax.innerHTML =
			data.max != null ? Math.round(data.max).toString() : "1000";
		const configObject = this.transformConfig(this.props.configObject);
		if (configObject.gradient !== this.gradientCfg) {
			this.gradientCfg = configObject.gradient;
			let gradient = this.legendContext.createLinearGradient(0, 0, 100, 1);
			for (let key in this.gradientCfg) {
				gradient.addColorStop(key, this.gradientCfg[key]);
			}
			this.legendContext.fillStyle = gradient;
			this.legendContext.fillRect(0, 0, 100, 10);
			this.heatmapGradient.src = this.legendCanvas.toDataURL();
		}
	};

	render() {
		return (
			<Box size="xlarge">
				<div
					ref={heatmapContainer => (this.heatmapContainer = heatmapContainer)}
				>
					<img
						onLoad={this.setContainerState}
						ref={imgElement => (this.imgElement = imgElement)}
						src={this.props.backgroundImage}
						alt={"heatmap"}
						style={{ display: "block", maxWidth: "100%" }}
					/>
					<ReactResizeDetector
						skipOnMount
						handleWidth
						handleHeight
						onResize={this.setContainerState}
					/>
				</div>
				<div
					ref={heatmapTooltip => (this.heatmapTooltip = heatmapTooltip)}
					style={{ display: "none" }}
				>
					0
				</div>
				<div ref={heatmapLegend => (this.heatmapLegend = heatmapLegend)}>
					<span
						ref={heatmapLegendMin => (this.heatmapLegendMin = heatmapLegendMin)}
						style={{ float: "left" }}
					>
						0
					</span>
					<span
						ref={heatmapLegendMax => (this.heatmapLegendMax = heatmapLegendMax)}
						style={{ float: "right" }}
					>
						1
					</span>
					<img
						alt={""}
						ref={heatmapGradient => (this.heatmapGradient = heatmapGradient)}
						style={{ width: "100%", height: "15px" }}
					/>
				</div>
			</Box>
		);
	}
}
