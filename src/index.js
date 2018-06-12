import React from "react";
import ReactDOM from "react-dom";
import { unregister } from "./registerServiceWorker";
import "moment/locale/de-ch";

import "./index.css";
import App from "./containers/app/App";

ReactDOM.render(<App />, document.getElementById("root"));
unregister();
