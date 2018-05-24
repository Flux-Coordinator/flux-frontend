// @flow
import * as React from "react";
import FormField from "grommet/components/FormField";
import TextInput from "grommet/components/TextInput";
import Loading from "../../components/loading/Loading";
import axios, { CancelToken, CancelTokenSource } from "axios";
import { Redirect } from "react-router-dom";

import Form from "./../../components/form/Form";
import Project from "../../models/Project";
import { ToastContext } from "./../../components/toast/ToastContext";
import { inputHandler } from "../../utils/InputHandler";

import type { AllInputTypes } from "../../utils/InputHandler";
import type { ToastMetadata } from "./../../components/toast/Toast";

type Props = {
	match: any
};

type State = {
	project: Project,
	loading: boolean,
	shouldRedirect: boolean,
	toast?: ToastMetadata
};

export default class EditProject extends React.Component<Props, State> {
	source: CancelTokenSource = CancelToken.source();
	state = {
		project: new Project(
			"Nicht initialisiertes Projekt",
			"Wahrscheinlich gab es einen Fehler in der Anwendung!",
			[]
		),
		loading: true,
		shouldRedirect: false
	};

	fetchProject = (projectId: number) => {
		return axios.get(`/projects/${projectId}`, {
			cancelToken: this.source.token
		});
	};

	saveProject = (project: Project) => {
		return axios.post("/projects", project, {
			cancelToken: this.source.token
		});
	};

	onProjectChanged = (key: string, value: AllInputTypes) => {
		this.setState((prevState, props) => {
			prevState.project = Object.assign(prevState.project, {
				[key]: value
			});
			return prevState;
		});
	};

	onSubmit = (showToast?: (toast: ToastMetadata) => void) => {
		this.saveProject(this.state.project)
			.then(result => {
				if (result.status === 201) {
					const toast: ToastMetadata = {
						status: "ok",
						children: "Projekt abgespeichert"
					};
					if (showToast) {
						showToast(toast);
					}
					this.setState({ shouldRedirect: true });
				}
			})
			.catch(error => {
				const toast: ToastMetadata = {
					status: "critical",
					children: "Projekt konnte nicht gespeichert werden"
				};
				if (showToast) {
					showToast(toast);
				}
			});
	};

	componentDidMount() {
		const { projectId } = this.props.match.params;

		if (typeof projectId === "undefined") {
			this.setState({
				project: new Project("", "", []),
				loading: false
			});
		} else {
			this.fetchProject(projectId).then(result => {
				const project = Project.fromObject(result.data);
				this.setState({
					project: project,
					loading: false
				});
			});
		}
	}

	render() {
		if (this.state.loading) {
			return <Loading />;
		}
		return (
			<ToastContext.Consumer>
				{(showToast: any) => (
					<Form
						heading="Projekt bearbeiten"
						onSubmit={() => this.onSubmit(showToast)}
					>
						<FormField label="Name">
							<TextInput
								name="name"
								placeholder="Projektname eingeben"
								value={this.state.project.name}
								onDOMChange={inputHandler(this.onProjectChanged)}
							/>
						</FormField>
						<FormField label="Beschreibung">
							<TextInput
								name="description"
								placeholder="Beschreibung des Projektes"
								value={this.state.project.description}
								onDOMChange={inputHandler(this.onProjectChanged)}
							/>
						</FormField>
						{this.state.shouldRedirect && <Redirect to="/projects" />}
					</Form>
				)}
			</ToastContext.Consumer>
		);
	}
}
