// @flow
import * as React from "react";
import FormField from "grommet/components/FormField";
import TextInput from "grommet/components/TextInput";

import Form from "./../form/Form";
import Project from "../../models/Project";

type Props = {
	match: any
};

type State = {
	project: Project
};

export default class EditProject extends React.Component<Props, State> {
	state = {
		project: new Project("uninitialized project", [])
	};

	static getDerivedStateFromProps(nextProps: Props, prevState: State) {
		const projectId = nextProps.match.params.projectId;

		let project: Project;

		if (projectId === "undefined") {
			project = new Project("", []);
		} else {
			// TODO: Get Project from server.
			project = new Project("", []);
		}

		return {
			project: project
		};
	}

	onTitleChanged = event => {
		const target = event.target;
		const value = target.value;

		this.setState(prevState => {
			prevState.project.name = value;
			return prevState;
		});
	};

	render() {
		return (
			<Form heading="Projekt bearbeiten">
				<FormField label="Name">
					<TextInput
						name="name"
						placeholder="Projektname eingeben"
						value={this.state.project.name}
						onDOMChange={this.onTitleChanged}
					/>
				</FormField>
			</Form>
		);
	}
}
