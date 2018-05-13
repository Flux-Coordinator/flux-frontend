// @flow
import * as React from "react";
import Button from "grommet/components/Button";

import WizardStep from "./WizardStep";

import type {
	StepProps,
	ExportData
} from "./../../../containers/importexport/ExportWizard";

type State = {
	returnData: ExportData
};

/**
import WizardStep from "./WizardStep";
 * This step receives the full list of projects and when the user clicks next, it has to clean up
 * the list of projects and leave only the projects that were selected in the state.
 */
export default class SelectProjectsStep extends React.Component<
	StepProps,
	State
> {
	state = {
		returnData: this.props.data
	};

	onNext = () => {
		this.props.onNext(this.state.returnData);
	};

	render() {
		return (
			<WizardStep heading="Step 1" onNext={this.onNext}>
				<h4>Children!</h4>
			</WizardStep>
		);
	}
}
