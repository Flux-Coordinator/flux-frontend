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
 * This step receives the full list of rooms and when the user clicks next, it has to clean
 * up the rooms and leave only the rooms that were selected inside the return data.
 */
export default class SelectRoomsStep extends React.Component<StepProps, State> {
	state = {
		returnData: this.props.data
	};

	render() {
		return (
			<div>
				<p>Step 2</p>
				<Button
					label="Next"
					onClick={() => this.props.onNext(this.state.returnData)}
				/>
			</div>
		);
	}
}
