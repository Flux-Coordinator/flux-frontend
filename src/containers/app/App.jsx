// @flow
import React from "react";
import GrommetApp from "grommet/components/App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios, { CancelToken } from "axios";

import RoomModel from "../../models/Room";
import ProjectModel from "../../models/Project";
import Room from "../../components/room/Room";
import Dashboard from "../../components/dashboard/Dashboard";
import NotFound from "../../components/notfound/NotFound";
import Projects from "../../components/projects/Projects";
import Layout from "../layout/Layout";
import Project from "../../components/projects/Project";

type Prop = {};

type State = {
	projects: ProjectModel[],
	loading: boolean
};

export default class App extends React.Component<Prop, State> {
	apiUrl: ?string;
	source: any;

	constructor() {
		super();
		this.apiUrl = process.env.REACT_APP_SERVICE_URI;
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

	getProjects = async () => {
		this.setState({ loading: true });
		axios
			.get(`${this.apiUrl}/projects?limit=0`, {
				cancelToken: this.source.token
			})
			.then(result => {
				this.setState(({ projects: result.data, loading: false }: State));
			})
			.catch(error => {
				if (!axios.isCancel(error)) {
					this.setState(({ projects: [], loading: false }: State));
				}
			});
	};

	renderProjectsPage = () => (
		<Projects loading={this.state.loading} projects={this.state.projects} />
	);

	renderProjectPage = ({ match }: { match: any }) => {
		const foundProject = this.state.projects.find(
			project => project.projectId === match.params.projectId
		);

		if (foundProject) {
			return <Project project={foundProject} />;
		}
		const infoMessage = `Das Projekt mit der ID ${
			match.params.projectId
		} konnte nicht gefunden werden.`;
		return <NotFound info={infoMessage} />;
	};

	renderRoomPage = ({ match }: { match: any }) => {
		const foundProject = this.state.projects.find(
			(project: ProjectModel) => project.projectId === match.params.projectId
		);

		if (foundProject) {
			const foundRoom = foundProject.rooms.find(
				(room: RoomModel) => room.name === match.params.roomName
			);

			if (foundRoom) {
				return <Room room={foundRoom} />;
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
									path="/projects/:projectId/rooms/:roomName"
									component={this.renderRoomPage}
								/>
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
