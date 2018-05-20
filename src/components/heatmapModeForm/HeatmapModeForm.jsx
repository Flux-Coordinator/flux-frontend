// @flow
import * as React from "react";
import Form from "./../../components/form/Form";
import FormField from "grommet/components/FormField";
import FormFields from "grommet/components/FormFields";
import CheckBox from "grommet/components/CheckBox";
import type { HeatmapModes } from "../../types/Heatmap";
import { inputHandler } from "../../utils/InputHandler";
import type { allInputTypes } from "../../utils/InputHandler";

type Props = {
	heatmapModes: HeatmapModes,
	onChange: (string, allInputTypes) => void
};

export default function HeatmapModeForm({ heatmapModes, onChange }: Props) {
	return (
		<Form heading="Modi aktivieren">
			<FormFields>
				<fieldset>
					<FormField label="Messabdeckung feststellen">
						<CheckBox
							name={"showCoverage"}
							toggle={true}
							checked={heatmapModes.showCoverage}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
					<FormField label="Pozyx Anchors anzeigen">
						<CheckBox
							name={"showAnchors"}
							toggle={true}
							checked={heatmapModes.showAnchors}
							onChange={inputHandler(onChange)}
						/>
					</FormField>
				</fieldset>
			</FormFields>
		</Form>
	);
}
