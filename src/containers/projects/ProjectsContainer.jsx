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
import ConfirmationOverlay from "./../confirmationOverlay/ConfirmationOverlay";
import Measurement from "../../models/Measurement";
import Room from "../../models/Room";
import Project from "../../models/Project";
import { ToastContext } from "./../../components/toast/ToastContext";
import { isNumber } from "./../../utils/NumberHelper";

import type { ConfirmationOverlayProps } from "./../confirmationOverlay/ConfirmationOverlay";
import type { ToastMetadata } from "./../../components/toast/Toast";

type Props = {
	match: any
};

type State = {
	loading: boolean,
	projects: Project[],
	confirmationOverlayProps?: ConfirmationOverlayProps
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

	deleteProject = (
		item: Project,
		showToast: (toast: ToastMetadata) => void
	) => {
		const { projectId } = item;
		if (!projectId) {
			return;
		}

		axios
			.delete(`/projects/${projectId}`)
			.then(result => {
				if (showToast) {
					showToast({
						status: "ok",
						children: "Das Projekt wurde erfolgreich gelöscht"
					});
				}
				this.loadProjects();
			})
			.catch(error => {
				if (showToast) {
					showToast({
						status: "critical",
						children: "Das Projekt konnte nicht gelöscht werden"
					});
				}
				this.loadProjects();
			});
	};

	deleteRoom = (item: Room, showToast: (toast: ToastMetadata) => void) => {
		const { roomId } = item;
		if (!roomId) {
			return;
		}

		axios
			.delete(`/rooms/${roomId}`)
			.then(result => {
				if (showToast) {
					showToast({
						status: "ok",
						children: "Der Raum wurde erfolgreich gelöscht"
					});
				}
				this.loadProjects();
			})
			.catch(error => {
				if (showToast) {
					showToast({
						status: "critical",
						children: "Der Raum konnte nicht gelöscht werden"
					});
				}
				this.loadProjects();
			});
	};

	deleteMeasurement = (
		item: Measurement,
		showToast: (toast: ToastMetadata) => void
	) => {
		const { measurementId } = item;
		if (!measurementId) {
			return;
		}

		axios
			.delete(`/measurements/${measurementId}`)
			.then(result => {
				if (showToast) {
					showToast({
						status: "ok",
						children: "Die Messung wurde erfolgreich gelöscht"
					});
				}
				this.loadProjects();
			})
			.catch(error => {
				if (showToast) {
					showToast({
						status: "critical",
						children: "Die Messung konnte nicht gelöscht werden"
					});
				}
				this.loadProjects();
			});
	};

	confirmProjectDeletion = (
		item: Project,
		showToast: (toast: ToastMetadata) => void
	) => {
		const onAccept = () => {
			this.deleteProject(item, showToast);
			this.closeConfirmationOverlay();
		};
		const confirmationProps: ConfirmationOverlayProps = {
			onAccept: onAccept,
			onReject: this.closeConfirmationOverlay,
			children:
				"Wenn Sie das Projekt löschen, werden alle Räume und Messungen des Projektes unwiderruflich gelöscht!"
		};
		this.setState({ confirmationOverlayProps: confirmationProps });
	};

	confirmRoomDeletion = (
		item: Room,
		showToast: (toast: ToastMetadata) => void
	) => {
		const onAccept = () => {
			this.deleteRoom(item, showToast);
			this.closeConfirmationOverlay();
		};
		const confirmationProps: ConfirmationOverlayProps = {
			onAccept: onAccept,
			onReject: this.closeConfirmationOverlay,
			children:
				"Wenn Sie den Raum löschen, werden alle Messungen des Raumes unwiderruflich gelöscht!"
		};
		this.setState({ confirmationOverlayProps: confirmationProps });
	};

	confirmMeasurementDeletion = (
		item: Measurement,
		showToast: (toast: ToastMetadata) => void
	) => {
		const onAccept = () => {
			this.deleteMeasurement(item, showToast);
			this.closeConfirmationOverlay();
		};
		const confirmationProps: ConfirmationOverlayProps = {
			onAccept: onAccept,
			onReject: this.closeConfirmationOverlay,
			children:
				"Wenn Sie die Messung löschen, werden alle Messwerte der Messung unwiderruflich gelöscht!"
		};
		this.setState({ confirmationOverlayProps: confirmationProps });
	};

	closeConfirmationOverlay = () => {
		this.setState({
			confirmationOverlayProps: undefined
		});
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
			<ToastContext.Consumer>
				{(showToast: any) => (
					<React.Fragment>
						{this.state.confirmationOverlayProps && (
							<ConfirmationOverlay {...this.state.confirmationOverlayProps} />
						)}
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
										<RoomComponent
											room={foundRoom}
											match={match}
											onDeleteMeasurement={item =>
												this.confirmMeasurementDeletion(item, showToast)
											}
										/>
									) : (
										<NotFound info="Raum konnte nicht gefunden werden" />
									);
								}}
							/>
							<Route
								path={`${match.url}/:projectId`}
								component={({ match }) => (
									<ProjectComponent
										onDeleteRoom={item =>
											this.confirmRoomDeletion(item, showToast)
										}
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
										onDeleteProject={item =>
											this.confirmProjectDeletion(item, showToast)
										}
										projects={projects}
										loading={loading}
										match={match}
									/>
								)}
							/>
						</Switch>
					</React.Fragment>
				)}
			</ToastContext.Consumer>
		);
	}
}
