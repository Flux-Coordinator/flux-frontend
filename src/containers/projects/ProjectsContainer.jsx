// @flow
import * as React from "react";
import axios, { CancelToken, CancelTokenSource } from "axios";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NotFound from "../../components/notfound/NotFound";
import RoomComponent from "./../../components/room/Room";
import ProjectComponent from "../../components/projects/Project";
import ProjectsComponent from "../../components/projects/Projects";
import LoadingComponent from "./../../components/loading/Loading";
import Room from "../../models/Room";
import Project from "../../models/Project";
import { isNumber } from "./../../utils/NumberHelper";

type Props = {
	match: any
};

type State = {
	loading: boolean,
	projects: Project[]
};

export default class ProjectsContainer extends React.Component<Props, State> {
	source: CancelTokenSource = CancelToken.source();

	state = {
		loading: false,
		projects: []
	};

	loadProjects = () => {
		this.setState({ loading: true });
		axios
			.get(`/projects?limit=0`, {
				cancelToken: this.source.token
			})
			.then(result => {
				const projs: Project[] = [];
				result.data.forEach(d => {
					projs.push(Project.fromObject(d));
				});
				this.setState({ projects: projs, loading: false });
			})
			.catch(error => {
				if (!axios.isCancel(error)) {
					this.setState({ projects: [], loading: false });
				}
			});
	};

	findProjectById = (projects: Project[], projectId: number | string) => {
		const projectIdInt = parseInt(projectId, 10);

		return projects.find(project => project.projectId === projectIdInt);
	};

	findRoomInProject = (project: Project, roomId: number | string) => {
		const roomIdInt = parseInt(roomId, 10);
		for (const room of project.rooms) {
			if (room.roomId === roomIdInt) return room;
		}
	};

	findRoomById = (
		project: Project | Project[],
		roomId: number | string,
		projectId?: number | string
	) => {
		const roomIdInt = parseInt(roomId, 10);
		const projectIdInt = parseInt(projectId, 10);

		if (Array.isArray(project)) {
			if (isNumber(projectIdInt)) {
				const maybeProject = this.findProjectById(project, projectIdInt);
				if (maybeProject) {
					return this.findRoomInProject(maybeProject, roomIdInt);
				}
				return null;
			}

			for (const p of project) {
				const maybeRoom: ?Room = this.findRoomInProject(p, roomIdInt);
				if (maybeRoom) {
					return maybeRoom;
				}
			}
			return null;
		}
		return this.findRoomInProject(project, roomIdInt);
	};

	onDelete = (item: Project) => {
		const result = window.confirm(
			"Möchten Sie das Projekt wirklich löschen? Achtung: Alle Daten des Projektes werden unwiderruflich gelöscht!"
		);
		if (result) {
			console.log("Project deleted");
		} else {
			console.log("Not deleted");
		}
	};

	componentDidMount() {
		this.loadProjects();
	}

	componentWillUnmount() {
		this.source.cancel();
	}

	render() {
		const { match } = this.props;
		const { loading, projects } = this.state;

		if (loading) {
			return <LoadingComponent />;
		}

		return (
			<Switch>
				<Route
					path={`${match.url}/:projectId/rooms/:roomId`}
					component={({ match }) => {
						const foundRoom = this.findRoomById(
							projects,
							match.params.roomId,
							match.params.projectId
						);
						return foundRoom ? (
							<RoomComponent room={foundRoom} match={match} />
						) : (
							<NotFound info="Raum konnte nicht gefunden werden" />
						);
					}}
				/>
				<Route
					path={`${match.url}/:projectId`}
					component={({ match }) => (
						<ProjectComponent
							projects={projects}
							loading={loading}
							match={match}
						/>
					)}
				/>
				<Route
					path={`${match.url}`}
					component={({ match }) => (
						<ProjectsComponent
							onDelete={this.onDelete}
							projects={projects}
							loading={loading}
							match={match}
						/>
					)}
				/>
			</Switch>
		);
	}
}
