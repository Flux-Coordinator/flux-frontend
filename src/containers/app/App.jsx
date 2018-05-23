// @flow
import React from "react";
import GrommetApp from "grommet/components/App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Dashboard from "../../components/dashboard/Dashboard";
import NotFound from "../../components/notfound/NotFound";
import ProjectsContainer from "./../projects/ProjectsContainer";
import Layout from "../layout/Layout";
import ImportExportContainer from "../importexport/ImportExportContainer";
import EditProject from "./../../containers/projects/EditProject";
import Login from "../login/LoginContainer";
import Toast from "./../../components/toast/Toast";
import { ToastContext } from "./../../components/toast/ToastContext";

import type { ToastMetadata } from "./../../components/toast/Toast";

type Prop = {};

type State = {
	toast?: ToastMetadata
};

export default class App extends React.Component<Prop, State> {
	constructor() {
		super();
		(axios.defaults: Object).baseURL = process.env.REACT_APP_SERVICE_URI; // Sets the default URL for the rest of the applications lifetime.
	}

	state = {};

	showToast = (metadata: ToastMetadata) => {
		this.setState({ toast: metadata });
	};

	render() {
		return (
			<ToastContext.Provider value={(this.showToast: any)}>
				<GrommetApp centered={false}>
					<Router>
						<Layout>
							<Switch>
								<Route path="/editProject/:projectId" component={EditProject} />
								<Route path="/editProject" component={EditProject} />
								<Route path="/projects" component={ProjectsContainer} />
								<Route path="/import" exact component={ImportExportContainer} />
								<Route path="/login" component={Login} />
								<Route path="/" exact component={Dashboard} />
								<Route component={NotFound} />
							</Switch>
						</Layout>
					</Router>
					<Toast
						metadata={this.state.toast}
						onClose={() => this.setState({ toast: undefined })}
					/>
				</GrommetApp>
			</ToastContext.Provider>
		);
	}
}
