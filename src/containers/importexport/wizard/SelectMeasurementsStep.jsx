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
 * This step receives the full list of measurements and when the user clicks next, it has to clean
 * up the measurements and leave only the measurements that were selected inside the return data.
 */
export default class SelectMeasurementsStep extends React.Component<
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
			<WizardStep heading="Step 3" onNext={this.onNext}>
				<h4>Children!</h4>
			</WizardStep>
		);
	}
}
