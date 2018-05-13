// @flow

import React from "react";
import axios from "axios";
import Button from "grommet/components/Button";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "./../src/index.css";
import ExportWizard from "./../src/containers/importexport/ExportWizard";

(axios.defaults: Object).baseURL = process.env.REACT_APP_SERVICE_URI; // Sets the default URL for the rest of the applications lifetime.

storiesOf("Button", module)
	.add("with text", () => (
		<Button onClick={action("clicked")}>Hello Button</Button>
	))
	.add("with some emoji", () => (
		<Button onClick={action("clicked")}>
			<span role="img" aria-label="Nice Cool Ok 100">
				😀 😎 👍 💯
			</span>
		</Button>
	));

storiesOf("Export Wizard", module).add("default", () => <ExportWizard />);
