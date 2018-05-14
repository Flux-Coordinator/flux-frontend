// @flow
import React from "react";
import GrommetApp from "grommet/components/App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios, { CancelToken, CancelTokenSource } from "axios";

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
	source: CancelTokenSource = CancelToken.source();

	constructor() {
		super();
		(axios.defaults: Object).baseURL = process.env.REACT_APP_SERVICE_URI; // Sets the default URL for the rest of the applications lifetime.
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
				this.setState({ projects: projs, loading: false });
			})
			.catch(error => {
				if (!axios.isCancel(error)) {
					this.setState({ projects: [], loading: false });
				} else {
					this.setState({ loading: false });
				}
				console.error(error);
			});
	};

	renderProjectsPage = () => (
		<Projects loading={this.state.loading} projects={this.state.projects} />
	);

	renderProjectPage = ({ match }: { match: any }) => {
		const { projects } = this.state;

		const foundProject = projects.find(
			project => project.projectId === parseInt(match.params.projectId, 10)
		);

		if (foundProject) {
			return <Project project={foundProject} match={match} />;
		}
		const infoMessage = `Das Projekt mit der ID ${
			match.params.projectId
		} konnte nicht gefunden werden.`;
		return <NotFound info={infoMessage} />;
	};

	renderRoomPage = ({ match }: any) => {
		const foundProject: ?ProjectModel = this.state.projects.find(
			(project: ProjectModel) =>
				project.projectId === parseInt(match.params.projectId, 10)
		);

		if (foundProject) {
			const foundRoom: ?RoomModel = foundProject.rooms.find(
				(room: RoomModel) => room.roomId === parseInt(match.params.roomId, 10)
			);

			if (foundRoom) {
				return (
					<Room match={match} parentProject={foundProject} room={foundRoom} />
				);
			}
		}

		const infoMessage = `Der Raum mit der ID ${
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
									path="/projects/:projectId/rooms/:roomId"
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
