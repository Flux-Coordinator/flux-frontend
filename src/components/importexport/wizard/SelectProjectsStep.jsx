// @flow
import * as React from "react";
import Button from "grommet/components/Button";

import type { StepProps } from "./../../../containers/importexport/ExportWizard";

export default function SelectProjectsStep({ onNext, data }: StepProps) {
	return (
		<div>
			<p>Step 1</p>
			<Button label="Next" onClick={onNext} />
		</div>
	);
}
