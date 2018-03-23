// @flow
import React from "react";
import App2 from "grommet/components/App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import RoomModel from "../../models/Room";
import Measurement from "../../models/Measurement";
import Project from "../../models/Project";
import Room from "../../components/room/Room";
import Welcome from "../../components/welcome/Welcome";
import NotFound from "../../components/notfound/NotFound";
import Layout from "../Layout/Layout";

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
	for (const project of currentProjects) {
		const foundRoom = project.rooms.find(
			room => room.id === match.params.roomId
		);

		if (foundRoom) {
			return <Room room={foundRoom} />;
		}
	}
	const infoMessage = `The Room with the ID ${match.params.id} was not found.`;
	return <NotFound info={infoMessage} />;
};

function App() {
	return (
		<div>
			<App2 centered={false}>
				<Router>
					<Layout projects={currentProjects}>
						<Switch>
							<Route path="/rooms/:roomId" component={RenderRoomPage} />
							<Route path="/" component={Welcome} />
						</Switch>
					</Layout>
				</Router>
			</App2>
		</div>
	);
}

export default App;
