// @flow
import * as React from "react";
import Form from "../../form/Form";
import FormField from "grommet/components/FormField";
import FormFields from "grommet/components/FormFields";
import RadioButton from "grommet/components/RadioButton";
import type { HeatmapMode } from "../../../types/Heatmap";
import { inputHandler } from "../../../utils/InputHandler";
import type { AllInputTypes } from "../../../utils/InputHandler";

type Props = {
	heatmapMode: HeatmapMode,
	onChange: (string, AllInputTypes) => void
};

export default function HeatmapModeForm({ heatmapMode, onChange }: Props) {
	return (
		<Form>
			<FormFields>
				<fieldset>
					<FormField>
						<RadioButton
							id={"heatmapModeDefault"}
							name={"heatmapMode"}
							label="Standard Ansicht"
							checked={heatmapMode === "DEFAULT"}
							value={"DEFAULT"}
							onChange={inputHandler(onChange)}
						/>
						<RadioButton
							id={"heatmapModeCoverage"}
							name={"heatmapMode"}
							label="Messabdeckung feststellen"
							checked={heatmapMode === "COVERAGE"}
							value={"COVERAGE"}
							onChange={inputHandler(onChange)}
						/>
						<RadioButton
							id={"heatmapModeAnchors"}
							name={"heatmapMode"}
							label="Anchors anzeigen"
							checked={heatmapMode === "ANCHORS"}
							value={"ANCHORS"}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
				</fieldset>
			</FormFields>
		</Form>
	);
}
