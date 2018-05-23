// @flow
import * as React from "react";
import Form from "./../../components/form/Form";
import FormField from "grommet/components/FormField";
import FormFields from "grommet/components/FormFields";
import NumberInput from "grommet/components/NumberInput";
import type { ConfigObject } from "../../types/Heatmap";
import { inputHandler } from "../../utils/InputHandler";
import type { AllInputTypes } from "../../utils/InputHandler";

type Props = {
	configObject: ConfigObject,
	onSubmit: () => void,
	onChange: (string, AllInputTypes) => void
};

export default function HeatmapConfigForm({
	configObject,
	onSubmit,
	onChange
}: Props) {
	return (
		<Form heading="Heatmap bearbeiten" onSubmit={onSubmit}>
			<FormFields>
				<fieldset>
					<FormField label="Radius">
						<NumberInput
							name={"radius"}
							value={configObject.radius}
							min={1}
							step={1}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
					<FormField label="Maximale Deckkraft">
						<NumberInput
							name={"maxOpacity"}
							value={configObject.maxOpacity}
							min={0}
							max={1}
							step={0.05}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
					<FormField label="Minimale Deckkraft">
						<NumberInput
							name={"minOpacity"}
							value={configObject.minOpacity}
							min={0}
							max={1}
							step={0.05}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
					<FormField label="Glättung">
						<NumberInput
							name={"blur"}
							value={configObject.blur}
							min={0}
							max={1}
							step={0.05}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
				</fieldset>
			</FormFields>
		</Form>
	);
}
