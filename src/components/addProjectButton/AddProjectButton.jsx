// @flow
import * as React from "react";
import Anchor from "grommet/components/Anchor";
import AddIcon from "grommet/components/icons/base/Add";

import Project from "../../models/Project";

function addProject() {
	const projectName = `NewProject${new Date()}`;
	const project = new Project("", projectName, []);
	const request = new XMLHttpRequest();
	if (request) {
		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status === 200) {
					console.log("Worked");
				}
			}
		};
		request.open("POST", "http://localhost:9000/projects", true);
		request.send(project);
	}
}

export default function AddProjectButton() {
	return <Anchor icon={<AddIcon onClick={addProject} />} />;
}
