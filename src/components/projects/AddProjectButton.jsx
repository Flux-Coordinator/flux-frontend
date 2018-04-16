// @flow
import * as React from "react";
import axios from "axios";
import Anchor from "grommet/components/Anchor";
import AddIcon from "grommet/components/icons/base/Add";

import Project from "../../models/Project";

function addProject() {
	const projectName = `NewProject${new Date()}`;
	const apiUrl = process.env.REACT_APP_SERVICE_URI;
	const project = new Project("", projectName, []);
	axios
		.post(`${apiUrl}/projects`, project)
		.then(result => {
			console.log(`Project available under: ${result.data}`);
		})
		.catch(error => {
			console.log(error);
		});
}

export default function AddProjectButton() {
	return <Anchor icon={<AddIcon onClick={addProject} />} />;
}
