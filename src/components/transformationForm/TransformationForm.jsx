// @flow
import * as React from "react";
import Form from "./../../components/form/Form";
import FormField from "grommet/components/FormField";
import FormFields from "grommet/components/FormFields";
import NumberInput from "grommet/components/NumberInput";
import Transformation from "../../models/Transformation";
import { inputHandler } from "../../utils/InputHandler";
import type { AllInputTypes } from "../../utils/InputHandler";

type Props = {
	transformation: Transformation,
	onSubmit: () => void,
	onChange: (string, AllInputTypes) => void
};

export default function TransformationForm({
	transformation,
	onSubmit,
	onChange
}: Props) {
	return (
		<Form heading="Heatmap transformieren" onSubmit={onSubmit}>
			<FormFields>
				<fieldset>
					<FormField label="Skalierungsfaktor">
						<NumberInput
							name={"scaleFactor"}
							value={transformation.scaleFactor}
							step={0.001}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
					<FormField label="Horizontaler Versatz">
						<NumberInput
							name={"xOffset"}
							value={transformation.xOffset}
							step={1}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
					<FormField label="Vertikaler Versatz">
						<NumberInput
							name={"yOffset"}
							value={transformation.yOffset}
							step={1}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
				</fieldset>
			</FormFields>
		</Form>
	);
}
