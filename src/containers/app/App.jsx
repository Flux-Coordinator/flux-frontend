// @flow
import React from "react";
import GrommetApp from "grommet/components/App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios, { CancelToken } from "axios";

import MeasurementModel from "../../models/Measurement";
import RoomModel from "../../models/Room";
import ProjectModel from "../../models/Project";
import Room from "../../components/room/Room";
import Dashboard from "../../components/dashboard/Dashboard";
import NotFound from "../../components/notfound/NotFound";
import Projects from "../../components/projects/Projects";
import Layout from "../layout/Layout";
import Project from "../../components/projects/Project";
import ImportExportContainer from "../importexport/ImportExport";

type Prop = {};

type State = {
	projects: ProjectModel[],
	loading: boolean
};

export default class App extends React.Component<Prop, State> {
	source: any;

	constructor() {
		super();
		axios.defaults.baseURL = process.env.REACT_APP_SERVICE_URI; // Sets the default URL for the rest of the applications lifetime.
		this.source = CancelToken.source();
	}

	state = {
		projects: [],
		loading: true
	};

	componentDidMount() {
		this.getProjects();
	}

	componentWillUnmount() {
		this.source.cancel();
	}

	getProjects = () => {
		this.setState({ loading: true });
		axios
			.get(`/projects?limit=0`, {
				cancelToken: this.source.token
			})
			.then(result => {
				const projs: ProjectModel[] = [];
				result.data.forEach(d => {
					projs.push(ProjectModel.fromObject(d));
				});
				this.setState(({ projects: projs, loading: false }: State));
			})
			.catch(error => {
				if (!axios.isCancel(error)) {
					this.setState(({ projects: [], loading: false }: State));
				}
				console.log(error);
			});
	};

	renderProjectsPage = () => (
		<Projects loading={this.state.loading} projects={this.state.projects} />
	);

	renderProjectPage = ({ match }: { match: any }) => {
		const projects = this.state.projects;

		const foundProject = projects.find(
			project => project.projectId === parseInt(match.params.projectId)
		);

		if (foundProject) {
			return <Project project={foundProject} />;
		}
		const infoMessage = `Das Projekt mit der ID ${
			match.params.projectId
		} konnte nicht gefunden werden.`;
		return <NotFound info={infoMessage} />;
	};

	renderRoomPage = ({ match }: any) => {
		const foundProject: ?ProjectModel = this.state.projects.find(
			(project: ProjectModel) =>
				project.projectId === parseInt(match.params.projectId)
		);

		if (foundProject) {
			const foundRoom: ?RoomModel = foundProject.rooms.find(
				(room: RoomModel) => room.name === match.params.roomName
			);

			if (foundRoom) {
				let currentMeasurement: ?MeasurementModel = null;
				if (match.params.measurementId) {
					currentMeasurement = foundRoom.measurements.find(
						measurement =>
							measurement.measurementId === parseInt(match.params.measurementId)
					);
				}
				return (
					<Room
						parentProject={foundProject}
						room={foundRoom}
						currentMeasurement={currentMeasurement}
					/>
				);
			}
		}

		const infoMessage = `Der Raum mit dem Namen ${
			match.params.roomId
		} konnte nicht gefunden werden.`;
		return <NotFound info={infoMessage} />;
	};

	render() {
		return (
			<div>
				<GrommetApp centered={false}>
					<Router>
						<Layout projects={this.state.projects}>
							<Switch>
								<Route
									path="/projects/:projectId"
									exact
									component={this.renderProjectPage}
								/>
								<Route
									path="/projects"
									exact
									component={this.renderProjectsPage}
								/>
								<Route
									path="/projects/:projectId/rooms/:roomName/measurements/:measurementId"
									component={this.renderRoomPage}
								/>
								<Route
									path="/projects/:projectId/rooms/:roomName"
									component={this.renderRoomPage}
								/>
								<Route path="/import" exact component={ImportExportContainer} />
								<Route path="/" exact component={Dashboard} />
								<Route path="/" component={NotFound} />
							</Switch>
						</Layout>
					</Router>
				</GrommetApp>
			</div>
		);
	}
}
