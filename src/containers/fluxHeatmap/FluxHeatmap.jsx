// @flow
import * as React from "react";
import ReactDOM from "react-dom";
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
			radius: 10,
			maxOpacity: 0.5,
			minOpacity: 0,
			blur: 0.75
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

	heatmap: Heatmap;
	imgElement: ?HTMLImageElement;

	componentDidMount() {
		this.heatmap = this.createHeatmapInstance(this.props.configObject);
		this.setData();
	}

	createHeatmapInstance = (configObject: ConfigObject): Heatmap => {
		const extendedConfigObject: ConfigObject = Object.assign(
			{},
			{
				container: ReactDOM.findDOMNode(this)
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
				this.heatmap.setData(new HeatmapData(0, max, dataPoints));
			}
		}
	};

	setConfig = () => {
		const currentData = this.destroyHeatmapInstance(this.heatmap);
		this.heatmap = this.createHeatmapInstance(this.props.configObject);
		this.heatmap.setData(currentData);
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

	render() {
		return (
			<Box size="xlarge">
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
			</Box>
		);
	}
}
