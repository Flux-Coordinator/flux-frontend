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
import PrivateRoute from "./../../components/routing/PrivateRoute";
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
						<Switch>
							<Route path="/login" component={Login} />
							<Layout>
								<Switch>
									<PrivateRoute
										path="/editProject/:projectId"
										component={EditProject}
									/>
									<PrivateRoute path="/editProject" component={EditProject} />
									<PrivateRoute
										path="/projects/:projectId/editRoom/:roomId"
										component={EditRoom}
									/>
									<PrivateRoute
										path="/projects/:projectId/editRoom"
										component={EditRoom}
									/>
									<PrivateRoute
										path="/projects/:projectId/rooms/:roomId/editMeasurement/:measurementId"
										component={EditMeasurement}
									/>
									<PrivateRoute
										path="/projects/:projectId/rooms/:roomId/editMeasurement"
										component={EditMeasurement}
									/>
									<PrivateRoute
										path="/projects"
										component={ProjectsContainer}
									/>
									<PrivateRoute
										path="/import"
										exact
										component={ImportExportContainer}
									/>
									<PrivateRoute path="/" exact component={DashboardContainer} />
									<PrivateRoute component={NotFound} />
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
