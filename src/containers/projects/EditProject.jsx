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
type Test = {
	t?: () => void
};

export default class EditProject extends React.Component<Props, State> {
	source: CancelTokenSource = CancelToken.source();
	state = {
		project: new Project("uninitialized project", []),
		loading: true,
		shouldRedirect: false
	};

	fetchProject = (projectId: number) => {
		return axios.get("/projects/" + projectId, {
			cancelToken: this.source.token
		});
	};

	saveProject = (project: Project) => {
		return axios.post("/projects", project, {
			cancelToken: this.source.token
		});
	};

	onTitleChanged = (event: SyntheticEvent<HTMLInputElement>) => {
		const target = event.currentTarget;
		const value = target.value;

		this.setState(prevState => {
			prevState.project.name = value;
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
		const projectId = this.props.match.params.projectId;

		let project: Project;

		if (typeof projectId === "undefined") {
			this.setState({
				project: new Project("", []),
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

		return {
			project: project
		};
	}

	render() {
		if (this.state.loading) {
			return <Loading />;
		}
		return (
			<ToastContext.Consumer>
				{showToast => (
					<Form
						heading="Projekt bearbeiten"
						onSubmit={() => this.onSubmit((showToast: any))}
					>
						<FormField label="Name">
							<TextInput
								name="name"
								placeholder="Projektname eingeben"
								value={this.state.project.name}
								onDOMChange={this.onTitleChanged}
							/>
						</FormField>
						{this.state.shouldRedirect && <Redirect to="/projects" />}
					</Form>
				)}
			</ToastContext.Consumer>
		);
	}
}
