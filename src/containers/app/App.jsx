// @flow
import React from "react";
import GrommetApp from "grommet/components/App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import RoomModel from "../../models/Room";
import Measurement from "../../models/Measurement";
import ProjectModel from "../../models/Project";
import Room from "../../components/room/Room";
import Dashboard from "../../components/dashboard/Dashboard";
import NotFound from "../../components/notfound/NotFound";
import Projects from "../../components/projects/Projects";
import Layout from "../layout/Layout";
import Project from "../../components/projects/Project";

const measurements: Measurement[] = [
	new Measurement("15564564564", "Erste Messung", new Date()),
	new Measurement("45648994884", "Zweite Messung", new Date()),
	new Measurement("16455161566", "Dritte Messung", new Date())
];

const rooms: RoomModel[] = [
	new RoomModel(
		"1234564",
		"Aula",
		"Ein grosser Saal mit Plätzen für 200 Personen und in der Mitte eine Absenkung.",
		measurements
	),
	new RoomModel(
		"7542213",
		"Mensa",
		"Platz für 400 Personen und eine Glasfassade.",
		measurements
	)
];

const currentProjects: ProjectModel[] = [
	new ProjectModel("583492902", "Hochschule Rapperswil", rooms),
	new ProjectModel("120991323", "Hochschule St. Gallen", rooms)
];

const RenderRoomPage = ({ match }: { match: Object }) => {
	for (const project of currentProjects) {
		const foundRoom = project.rooms.find(
			room => room.id === match.params.roomId
		);

		if (foundRoom) {
			return <Room room={foundRoom} />;
		}
	}
	const infoMessage = `Das Projekt mit der ID ${
		match.params.roomId
	} konnte nicht gefunden werden.`;
	return <NotFound info={infoMessage} />;
};

const RenderProjectsPage = () => {
	return <Projects projects={currentProjects} />;
};

const RenderProjectPage = ({ match }: { match: Object }) => {
	const foundProject = currentProjects.find(
		project => project.id === match.params.projectId
	);

	if (foundProject) {
		return <Project project={foundProject} />;
	}
	const infoMessage = `Das Projekt mit der ID ${
		match.params.projectId
	} konnte nicht gefunden werden.`;
	return <NotFound info={infoMessage} />;
};

function App() {
	return (
		<div>
			<GrommetApp centered={false}>
				<Router>
					<Layout projects={currentProjects}>
						<Switch>
							<Route
								path="/projects/:projectId"
								component={RenderProjectPage}
							/>
							<Route path="/projects" component={RenderProjectsPage} />
							<Route path="/rooms/:roomId" component={RenderRoomPage} />
							<Route path="/" exact component={Dashboard} />
							<Route path="/" component={NotFound} />
						</Switch>
					</Layout>
				</Router>
			</GrommetApp>
		</div>
	);
}

export default App;
