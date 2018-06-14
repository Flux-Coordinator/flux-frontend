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
	isLoading: boolean,
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
		isLoading: true,
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
		this.setState({ isLoading: true });
		this.saveProject(this.state.project)
			.then(result => {
				if (result.status === 201) {
					if (showToast) {
						showToast({
							status: "ok",
							children: "Projekt abgespeichert"
						});
					}
					this.setState({ shouldRedirect: true });
				}
			})
			.catch(error => {
				this.setState({ isLoading: false });
				if (showToast) {
					showToast({
						status: "critical",
						children: "Projekt konnte nicht gespeichert werden"
					});
				}
			});
	};

	componentDidMount() {
		const { projectId } = this.props.match.params;

		if (typeof projectId === "undefined") {
			this.setState({
				project: new Project("", "", []),
				isLoading: false
			});
		} else {
			this.fetchProject(projectId).then(result => {
				const project = Project.fromObject(result.data);
				this.setState({
					project: project,
					isLoading: false
				});
			});
		}
	}

	render() {
		if (this.state.shouldRedirect) {
			return <Redirect to="/projects" />;
		}

		if (this.state.isLoading) {
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
								required
								placeHolder="Projektname eingeben"
								value={this.state.project.name}
								onDOMChange={inputHandler(this.onProjectChanged)}
							/>
						</FormField>
						<FormField label="Beschreibung">
							<TextInput
								name="description"
								placeHolder="Beschreibung des Projektes"
								value={this.state.project.description}
								onDOMChange={inputHandler(this.onProjectChanged)}
							/>
						</FormField>
					</Form>
				)}
			</ToastContext.Consumer>
		);
	}
}
