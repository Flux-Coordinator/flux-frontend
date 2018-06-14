// @flow
import * as React from "react";
import Layer from "grommet/components/Layer";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Footer from "grommet/components/Footer";
import Paragraph from "grommet/components/Paragraph";
import Form from "grommet/components/Form";
import FormFields from "grommet/components/FormFields";
import CheckBox from "grommet/components/CheckBox";
import Button from "grommet/components/Button";

import { inputHandler } from "../../utils/InputHandler";

import type { AllInputTypes } from "../../utils/InputHandler";

export type ConfirmationOverlayProps = {
	children: React.Node,
	onAccept?: () => void,
	onReject?: () => void
};

type State = {
	criticalConfirmation: boolean
};

export default class ConfirmationOverlay extends React.Component<
	ConfirmationOverlayProps,
	State
> {
	state = {
		criticalConfirmation: false
	};

	onConfirmationChanged = (key: string, value: AllInputTypes) => {
		this.setState({
			criticalConfirmation: value ? true : false
		});
	};

	render() {
		const { children, onAccept, onReject } = this.props;

		const isSubmitAllowed = () => {
			if (this.state.criticalConfirmation) return onAccept;
			else return null;
		};

		return (
			<Layer align="left" overlayClose closer onClose={onReject}>
				<Form>
					<Header>
						<Heading>Bestätigen</Heading>
					</Header>
					<FormFields>
						{children}
						<fieldset>
							<Paragraph>
								Sie müssen die destruktive Natur dieser Aktion bestätigen.
							</Paragraph>
							<CheckBox
								name="agree"
								onChange={inputHandler(this.onConfirmationChanged)}
								checked={this.state.criticalConfirmation}
								label="Ich verstehe, dass ich meine Daten verlieren kann."
							/>
						</fieldset>
					</FormFields>
					<Footer pad={{ vertical: "medium" }}>
						<Button label="Übermitteln" primary onClick={isSubmitAllowed()} />
					</Footer>
				</Form>
			</Layer>
		);
	}
}
