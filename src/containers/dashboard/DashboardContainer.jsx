// @flow
import * as React from "react";
import GrommetApp from "grommet/components/App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Dashboard from "../../components/dashboard/Dashboard";

type Props = {};

export default class DashboardContainer extends React.Component<Props> {
	render() {
		<Dashboard />;
	}
}
