// @flow
import * as React from "react";
import ReactDOM from "react-dom";
import Heatmap from "heatmapjs/build/heatmap.js";
import ReadingModel from "../../models/Reading";
import ReactResizeDetector from "react-resize-detector";
import Transformation from "../../models/Transformation";
import type {
	ConfigObject,
	HeatmapModes,
	HeatmapDataPoint,
	Container
} from "../../types/Heatmap";
import Box from "grommet/components/Box";
import { PLACEHOLDER_IMAGE } from "../../images/ImagesBase64";

type Props = {
	readings: ReadingModel[],
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
		this.setData(this.props.readings);
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

	componentDidUpdate(prevProps: Props, prevState: State) {
		this.setConfig(this.props.configObject);
		this.setData(this.props.readings);
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

	setData = (readings: ReadingModel[]) => {
		if (readings.length > 0 && this.state.container.loaded) {
			const showCoverage =
				this.props.heatmapModes.showCoverage != null
					? this.props.heatmapModes.showCoverage
					: false;
			const dataPoints = this.transformData(
				readings,
				this.state.container,
				this.props.transformation,
				showCoverage
			);
			const max = this.computeMax(dataPoints);
			this.heatmap.setData({
				min: 0,
				max: max,
				data: dataPoints
			});
		}
	};

	setConfig = (configObject: ConfigObject) => {
		const currentData = this.destroyHeatmapInstance(this.heatmap);
		this.heatmap = this.createHeatmapInstance(configObject);
		this.heatmap.setData(currentData);
	};

	computeMax = (dataPoints: HeatmapDataPoint[]) => {
		return Math.max(...dataPoints.map(d => d.value));
	};

	transformData = (
		readings: ReadingModel[],
		container: Container,
		transformation: Transformation,
		showCoverage: boolean
	): HeatmapDataPoint[] => {
		return readings.reduce(function(transformedReadings, reading) {
			const elementScaleFactor = container.width / container.originalWidth;
			const x = Math.round(
				(reading.xposition * transformation.scaleFactor +
					transformation.xOffset) *
					elementScaleFactor
			);
			const y =
				container.height -
				Math.round(
					(reading.yposition * transformation.scaleFactor +
						transformation.yOffset) *
						elementScaleFactor
				);
			const value = showCoverage ? 1 : reading.luxValue;
			if (x >= 0 && y >= 0 && x <= container.width && y <= container.height) {
				transformedReadings.push({
					x: x,
					y: y,
					value: value
				});
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
