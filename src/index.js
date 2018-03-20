// @flow

import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "typeface-roboto";

import "./index.css";
import App from "./containers/App/App";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
