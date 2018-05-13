// @flow
import * as React from "react";
import Button from "grommet/components/Button";

import type {
	StepProps,
	ExportData
} from "./../../../containers/importexport/ExportWizard";

type State = {
	returnData: ExportData
};

/**
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

	render() {
		return (
			<div>
				<p>Step 1</p>
				<Button
					label="Next"
					onClick={() => this.props.onNext(this.state.returnData)}
				/>
			</div>
		);
	}
}
