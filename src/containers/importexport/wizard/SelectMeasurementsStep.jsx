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

	render() {
		return (
			<div>
				<p>Step 3</p>
				<Button
					label="Next"
					onClick={() => this.props.onNext(this.state.returnData)}
				/>
			</div>
		);
	}
}
