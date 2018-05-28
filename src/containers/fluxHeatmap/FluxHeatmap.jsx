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
import type { ConfigObject, Container, HeatmapMode } from "../../types/Heatmap";
import Box from "grommet/components/Box";
import { PLACEHOLDER_IMAGE } from "../../images/ImagesBase64";
import HeatmapLegend from "./HeatmapLegend";
import HeatmapTooltip from "./HeatmapTooltip";
import BrowserPosition from "../../models/BrowserPosition";

const FIXED_HEATMAP_VALUE = 1;

type Props = {
	readings: ReadingModel[],
	anchors: AnchorModel[],
	backgroundImage: string,
	configObject: ConfigObject,
	transformation: Transformation,
	heatmapMode: HeatmapMode
};

type State = {
	container: Container,
	configObject: ConfigObject,
	heatmapData: HeatmapData
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
		heatmapMode: "DEFAULT"
	};

	state = {
		container: {
			height: 1,
			width: 1,
			originalHeight: 1,
			originalWidth: 1,
			loaded: false
		},
		configObject: {},
		heatmapData: new HeatmapData(0, 1, [])
	};

	heatmap: Heatmap;
	heatmapContainer: ?HTMLDivElement;
	imgElement: ?HTMLImageElement;

	componentDidMount() {
		this.heatmap = this.createHeatmapInstance(
			this.loadConfig(this.props.configObject)
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

	destroyHeatmapInstance = (heatmapInstance: Heatmap) => {
		// destroy function not supported from Heatmap.js, but needed due to a bug on config change:
		// https://github.com/pa7/heatmap.js/issues/209
		heatmapInstance._renderer.canvas.remove();
	};

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (
			prevProps.heatmapMode !== this.props.heatmapMode ||
			prevProps.transformation !== this.props.transformation ||
			prevState.container.width !== this.state.container.width ||
			prevState.container.height !== this.state.container.height
		) {
			this.setConfig();
			this.setData();
		} else {
			if (prevProps.configObject !== this.props.configObject) {
				this.setConfig();
			}
			if (prevProps.readings.length !== this.props.readings.length) {
				this.setData();
			}
		}
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
			let dataPoints: HeatmapDataPoint[];
			dataPoints = [];
			if (this.props.transformation.scaleFactor !== 0) {
				if (this.props.heatmapMode === "ANCHORS") {
					dataPoints = this.transformData((this.props.anchors: any), false);
				} else if (this.props.readings.length > 0) {
					dataPoints = this.transformData(
						(this.props.readings: any),
						this.props.heatmapMode === "COVERAGE"
					);
				}
			}
			const max = this.computeMax(dataPoints);
			const heatmapData = new HeatmapData(0, max, dataPoints);
			this.setState({ heatmapData: heatmapData });
			this.heatmap.setData(heatmapData);
		}
	};

	setConfig = () => {
		if (this.state.container.loaded) {
			let configObject = this.loadConfig(this.props.configObject);
			if (this.props.heatmapMode === "ANCHORS") {
				configObject = {
					radius: 4,
					opacity: 1,
					blur: 0,
					gradient: {
						"1": "red"
					}
				};
			}
			this.destroyHeatmapInstance(this.heatmap);
			this.heatmap = this.createHeatmapInstance(configObject);
			this.heatmap.setData(this.state.heatmapData);
		}
	};

	computeMax = (dataPoints: HeatmapDataPoint[]) => {
		if (dataPoints.length === 0) {
			return 0;
		}
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

	loadConfig = (configObject: ConfigObject): ConfigObject => {
		let newConfigObject = this.transformConfig(
			this.addDefaultConfig(configObject)
		);
		this.setState({ configObject: newConfigObject });
		return newConfigObject;
	};

	addDefaultConfig = (configObject: ConfigObject): ConfigObject => {
		return Object.assign(
			{},
			FluxHeatmap.defaultProps.configObject,
			configObject
		);
	};

	transformConfig = (configObject: ConfigObject): ConfigObject => {
		let transformedConfigObject = configObject;
		if (configObject.radius != null) {
			const container = this.state.container;
			const transformation = this.props.transformation;
			const containerScaleFactor = container.width / container.originalWidth;
			let radius =
				configObject.radius * transformation.scaleFactor * containerScaleFactor;
			if (radius <= 0.5) {
				radius = 0.5;
			}
			transformedConfigObject = Object.assign({}, configObject, {
				radius: radius
			});
		}
		return transformedConfigObject;
	};

	getValueForTooltip = (position: BrowserPosition): number => {
		let value = this.heatmap.getValueAt({
			x: position.xposition,
			y: position.yposition
		});
		if (this.props.heatmapMode === "ANCHORS" && value !== 0) {
			const points = this.state.heatmapData.data;
			value = points.reduce(
				(prev, curr) =>
					this.getDistance(curr, position) < this.getDistance(prev, position)
						? curr
						: prev
			).value;
		}
		return value;
	};

	getDistance = (p1: HeatmapDataPoint, p2: BrowserPosition): number => {
		return Math.sqrt(
			Math.pow(p1.x - p2.xposition, 2) + Math.pow(p1.y - p2.yposition, 2)
		);
	};

	render() {
		return (
			<Box size="xlarge">
				<HeatmapTooltip
					getValueCallback={this.getValueForTooltip}
					heatmapMode={this.props.heatmapMode}
				>
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
				</HeatmapTooltip>
				{this.state.configObject.gradient &&
					this.props.heatmapMode !== "ANCHORS" && (
						<HeatmapLegend
							heatmapGradient={this.state.configObject.gradient}
							heatmapData={this.state.heatmapData}
						/>
					)}
			</Box>
		);
	}
}
