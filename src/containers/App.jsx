// @flow
import React from "react";
import CssBaseline from "material-ui/CssBaseline/CssBaseline";

import Layout from "./Layout";
import { Measurement, Project, Room } from "../types/Models";

const measurements: Measurement[] = [
	new Measurement("asklmda", "Erste Messung", "Fri, 02 Feb 1996 03:04:05 GMT"),
	new Measurement(
		"asdkmlas",
		"Zweite Messung",
		"Sun, 31 Dec 1899 00:00:00 GMT"
	),
	new Measurement("askmlda1", "Dritte Messung", "Fri, 02 Feb 1996 03:04:05 GMT")
];

const rooms: Room[] = [new Room("askmld", "MyRoom", measurements)];

const currentProjects: Project[] = [
	new Project("aslkmd", "My First Project", rooms)
];

function App() {
	return (
		<div className="App">
			<CssBaseline />
			<Layout projects={currentProjects}>
				<p>Hallo!</p>
			</Layout>
		</div>
	);
}

export default App;
