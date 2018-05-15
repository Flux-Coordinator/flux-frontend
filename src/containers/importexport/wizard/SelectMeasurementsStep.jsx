// @flow
import * as React from "react";

import WizardStep from "./WizardStep";
import Project from "./../../../models/Project";

import type { StepProps } from "./../../../containers/importexport/ExportWizard";

type State = {
	returnData: Project[]
};

/**
 * This step receives the full list of measurements and when the user clicks next, it has to clean
 * up the measurements and leave only the measurements that were selected inside the return data.
 */
export default class SelectMeasurementsStep extends React.Component<
	StepProps,
	State
> {
	state = {
		returnData: this.props.projects
	};

	onNext = () => {
		this.props.onNext(this.state.returnData);
	};

	render() {
		return (
			<WizardStep
				heading="Schritt 3: Wählen Sie die Messungen aus"
				onNext={this.onNext}
			>
				<h4>Children!</h4>
			</WizardStep>
		);
	}
}
