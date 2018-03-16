// @flow

import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import App from "./containers/App";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
