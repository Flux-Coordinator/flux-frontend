// @flow
import * as React from "react";
import Form from "./../../components/form/Form";
import FormField from "grommet/components/FormField";
import FormFields from "grommet/components/FormFields";
import CheckBox from "grommet/components/CheckBox";
import type { ConfigObject } from "../../types/Heatmap";
import { inputHandler } from "../../utils/InputHandler";
import type { allInputTypes } from "../../utils/InputHandler";

type Props = {
	configObject: ConfigObject,
	onChange: (string, allInputTypes) => void
};

export default function HeatmapModeForm({ configObject, onChange }: Props) {
	return (
		<Form heading="Modi aktivieren">
			<FormFields>
				<fieldset>
					<FormField label="Messabdeckung feststellen">
						<CheckBox
							name={"fixedValue"}
							toggle={true}
							checked={configObject.fixedValue}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
				</fieldset>
			</FormFields>
		</Form>
	);
}
