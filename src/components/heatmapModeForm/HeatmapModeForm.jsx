// @flow
import * as React from "react";
import Form from "./../../components/form/Form";
import FormField from "grommet/components/FormField";
import FormFields from "grommet/components/FormFields";
import CheckBox from "grommet/components/CheckBox";
import type { ConfigObject } from "../../types/Heatmap";

type Props = {
	configObject: ConfigObject,
	onChange: (event: SyntheticEvent<HTMLInputElement>) => void
};

export default function HeatmapModeForm({
	configObject,
	onSubmit,
	onChange
}: Props) {
	return (
		<Form heading="Modi aktivieren" onSubmit={() => {}}>
			<FormFields>
				<fieldset>
					<FormField label="Messabdeckung feststellen">
						<CheckBox
							name={"fixedValue"}
							toggle={true}
							checked={configObject.fixedValue}
							onChange={onChange}
						/>
					</FormField>
				</fieldset>
			</FormFields>
		</Form>
	);
}
