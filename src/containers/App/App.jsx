// @flow
import React from "react";
import CssBaseline from "material-ui/CssBaseline/CssBaseline";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Layout from "../Layout/Layout";
import RoomModel from "../../models/Room";
import Measurement from "../../models/Measurement";
import Project from "../../models/Project";
import Welcome from "../../components/welcome/Welcome";
import Room from "../../components/room/Room";
import NotFound from "../../components/notfound/NotFound";

const measurements: Measurement[] = [
	new Measurement("15564564564", "Erste Messung", new Date()),
	new Measurement("45648994884", "Zweite Messung", new Date()),
	new Measurement("16455161566", "Dritte Messung", new Date())
];

const rooms: RoomModel[] = [
	new RoomModel("1234564", "Aula", measurements),
	new RoomModel("7542213", "Mensa", measurements)
];

const currentProjects: Project[] = [
	new Project("583492902", "Schule Rapperswil", rooms)
];

const RenderRoomPage = ({ match }: { match: Object }) => {
	let foundRoom;
	for (const project of currentProjects) {
		foundRoom = project.rooms.find(room => room.id === match.params.roomId);

		if (foundRoom) {
			break;
		}
	}
	if (foundRoom) {
		return <Room room={foundRoom} />;
	}
	const infoMessage = `The Room with the ID ${match.params.id} was not found.`;
	return <NotFound info={infoMessage} />;
};

function App() {
	return (
		<div className="App">
			<CssBaseline />
			<BrowserRouter>
				<Layout projects={currentProjects}>
					<Switch>
						<Route path="/room/:roomId" render={RenderRoomPage} />
						<Route path="/" component={Welcome} />
					</Switch>
				</Layout>
			</BrowserRouter>
		</div>
	);
}

export default App;
