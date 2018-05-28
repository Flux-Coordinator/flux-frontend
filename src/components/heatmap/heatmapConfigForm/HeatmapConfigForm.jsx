// @flow
import * as React from "react";
import Form from "../../form/Form";
import FormField from "grommet/components/FormField";
import FormFields from "grommet/components/FormFields";
import NumberInput from "grommet/components/NumberInput";
import type { ConfigObject } from "../../../types/Heatmap";
import { inputHandler } from "../../../utils/InputHandler";
import type { AllInputTypes } from "../../../utils/InputHandler";

type Props = {
	configObject: ConfigObject,
	onChange: (string, AllInputTypes) => void
};

export default function HeatmapConfigForm({ configObject, onChange }: Props) {
	return (
		<Form heading="Heatmap bearbeiten">
			<FormFields>
				<fieldset>
					<FormField label="Radius (in Millimeter)">
						<NumberInput
							name={"radius"}
							value={configObject.radius}
							min={1}
							step={1}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
					<FormField label="Minimale Deckkraft (0 bis 1)">
						<NumberInput
							name={"minOpacity"}
							value={configObject.minOpacity}
							min={0}
							max={1}
							step={0.05}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
					<FormField label="Maximale Deckkraft (0 bis 1)">
						<NumberInput
							name={"maxOpacity"}
							value={configObject.maxOpacity}
							min={0}
							max={1}
							step={0.05}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
					<FormField label="Glättung (0 bis 1)">
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
