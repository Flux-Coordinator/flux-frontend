// @flow

import React from "react";
import Button from "grommet/components/Button";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ExportWizard from "./../src/containers/importexport/ExportWizard";

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
