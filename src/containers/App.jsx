// @flow
import React from "react";
import CssBaseline from "material-ui/CssBaseline/CssBaseline";

import Layout from "./Layout";
import type { Project } from "../types/Models";

const currentProjects: Project[] = [
	{
		id: "askldmkasmd",
		name: "My First Project",
		rooms: [
			{
				id: "asmdlaksmd",
				name: "Room 1",
				measurements: [
					{
						id: "1opkwdas",
						description: "Erste Messung",
						date: "Fri, 02 Feb 1996 03:04:05 GMT"
					},
					{
						id: "asdt24rf",
						description: "Zweite Messung",
						date: "Sun, 31 Dec 1899 00:00:00 GMT"
					},
					{
						id: "12v23b5n",
						description: "Dritte Messung",
						date: "Sun, 31 Dec 1899 00:00:00 GMT"
					}
				]
			},
			{
				id: "asmdam",
				name: "Room 2",
				measurements: [
					{
						id: "jthrgewe",
						description: "Erste Messung",
						date: "Fri, 02 Feb 1996 03:04:05 GMT"
					},
					{
						id: "45uhdfbs",
						description: "Zweite Messung",
						date: "Sun, 31 Dec 1899 00:00:00 GMT"
					},
					{
						id: "tcvfzugb",
						description: "Dritte Messung",
						date: "Fri, 02 Feb 1996 03:04:05 GMT"
					}
				]
			}
		]
	}
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
