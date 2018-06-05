// @flow
import * as React from "react";
import GrommetApp from "grommet/components/App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import DashboardContainer from "./../dashboard/DashboardContainer";
import NotFound from "../../components/notfound/NotFound";
import ProjectsContainer from "./../projects/ProjectsContainer";
import Layout from "../layout/Layout";
import ImportExportContainer from "../importexport/ImportExportContainer";
import EditProject from "./../../containers/projects/EditProject";
import EditRoom from "./../../containers/rooms/EditRoom";
import EditMeasurement from "./../../containers/measurements/EditMeasurement";
import Login from "../login/LoginContainer";
import Toast from "./../../components/toast/Toast";
import ProtectedRoute from "./../../components/routing/ProtectedRoute";
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
		axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
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
						<Switch>
							<Route path="/login" component={Login} />
							<Layout>
								<Switch>
									<ProtectedRoute
										path="/editProject/:projectId"
										component={EditProject}
									/>
									<ProtectedRoute path="/editProject" component={EditProject} />
									<ProtectedRoute
										path="/projects/:projectId/editRoom/:roomId"
										component={EditRoom}
									/>
									<ProtectedRoute
										path="/projects/:projectId/editRoom"
										component={EditRoom}
									/>
									<ProtectedRoute
										path="/projects/:projectId/rooms/:roomId/editMeasurement/:measurementId"
										component={EditMeasurement}
									/>
									<ProtectedRoute
										path="/projects/:projectId/rooms/:roomId/editMeasurement"
										component={EditMeasurement}
									/>
									<ProtectedRoute
										path="/projects"
										component={ProjectsContainer}
									/>
									<ProtectedRoute
										path="/import"
										exact
										component={ImportExportContainer}
									/>
									<ProtectedRoute
										path="/"
										exact
										component={DashboardContainer}
									/>
									<ProtectedRoute component={NotFound} />
								</Switch>
							</Layout>
						</Switch>
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
