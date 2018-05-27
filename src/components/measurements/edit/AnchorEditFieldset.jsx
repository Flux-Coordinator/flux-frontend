// @flow
import * as React from "react";
import Paragraph from "grommet/components/Paragraph";
import FormField from "grommet/components/FormField";
import NumberInput from "grommet/components/NumberInput";
import TextInput from "grommet/components/TextInput";

import Anchor from "./../../../models/Anchor";
import { inputHandler } from "../../../utils/InputHandler";

import type { AllInputTypes } from "../../../utils/InputHandler";

type Props = {
	anchorIndex: number,
	anchor: Anchor,
	onAnchorValueChanged: (anchorIndex: number, anchor: Anchor) => void
};

export default function AnchorEditFieldset({
	anchorIndex,
	anchor,
	anchorIdSuggestions,
	onAnchorValueChanged
}: Props) {
	const onAnchorPositionChanged = (key: string, value: AllInputTypes) => {
		anchor.position = Object.assign(anchor.position, {
			[key]: value
		});

		onAnchorValueChanged(anchorIndex, anchor);
	};

	const onAnchorChanged = (key: string, value: AllInputTypes) => {
		anchor = Object.assign(anchor, {
			[key]: value
		});
		onAnchorValueChanged(anchorIndex, anchor);
	};

	const displayingIndex = anchorIndex + 1;

	return (
		<fieldset>
			<Paragraph>Anchor {displayingIndex}</Paragraph>
			<FormField label="Anchor ID">
				<TextInput
					name="networkId"
					placeHolder={`Netzwerkidentifikation von Anchor ${displayingIndex}`}
					value={anchor.networkId}
					onDOMChange={inputHandler(onAnchorChanged)}
				/>
			</FormField>
			<FormField label="x-Position (in Millimeter)">
				<NumberInput
					name="xposition"
					value={anchor.position.xposition}
					onChange={inputHandler(onAnchorPositionChanged)}
				/>
			</FormField>
			<FormField label="y-Position (in Millimeter)">
				<NumberInput
					name="yposition"
					value={anchor.position.yposition}
					onChange={inputHandler(onAnchorPositionChanged)}
				/>
			</FormField>
			<FormField label="z-Position (in Millimeter)">
				<NumberInput
					name="zposition"
					value={anchor.position.zposition}
					onChange={inputHandler(onAnchorPositionChanged)}
				/>
			</FormField>
		</fieldset>
	);
}
