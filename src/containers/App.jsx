// @flow
import React from "react";
import CssBaseline from "material-ui/CssBaseline/CssBaseline";

import Layout from "./Layout";
import { Room } from "../models/Room";
import { Measurement } from "../models/Measurement";
import { Project } from "../models/Project";

const measurements: Measurement[] = [
	new Measurement("asklmda", "Erste Messung", new Date()),
	new Measurement("asdkmlas", "Zweite Messung", new Date()),
	new Measurement("askmlda1", "Dritte Messung", new Date())
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
