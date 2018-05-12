import * as React from "react";
import Button from "grommet/components/Button";
import axios, { CancelToken } from "axios";

type Props = {};
type State = {
	currentStep: number,
	steps: (() => void)[]
};

function SelectProjectsStep(onNext: () => void) {
	return (
		<div>
			<p>Step 1</p>
			<Button label="Next" onClick={onNext} />
		</div>
	);
}

function SelectRoomsStep(onNext: () => void) {
	return (
		<div>
			<p>Step 2</p>
			<Button label="Next" onClick={onNext} />
		</div>
	);
}

function SelectMeasurementsStep(onNext: () => void) {
	return (
		<div>
			<p>Step 3</p>
			<Button label="Next" onClick={onNext} />
		</div>
	);
}

export default class ExportWizard extends React.Component<Props, State> {
	state = {
		currentStep: 0,
		steps: [SelectProjectsStep, SelectRoomsStep, SelectMeasurementsStep]
	};

	next = () => {
		if (this.state.currentStep < this.state.steps.length - 1) {
			this.setState((prevState, props) => {
				return { currentStep: prevState.currentStep + 1 };
			});
		}
	};

	fetchData = () => {
		// TODO:    Fetch the data after next is called. Make this a smart algorithm, that
		//          fetches the data from the available projects. If there are projects,
		//          fetch rooms. If there are rooms, fetch their measurements.
		//          Like this, we avoid having to make complicated callbacks for the steps to fetch data.
	};

	render() {
		return this.state.steps[this.state.currentStep](this.next);
	}
}
