// @flow
import * as React from "react";
import TextInput from "grommet/components/TextInput";
import FormField from "grommet/components/FormField";
import Loading from "../../components/loading/Loading";
import axios, { CancelToken, CancelTokenSource } from "axios";
import { Redirect } from "react-router-dom";

import Measurement from "../../models/Measurement";
import Room from "../../models/Room";
import Form from "./../../components/form/Form";
import { ToastContext } from "./../../components/toast/ToastContext";
import { inputHandler } from "../../utils/InputHandler";

import type { AllInputTypes } from "../../utils/InputHandler";
import type { ToastMetadata } from "./../../components/toast/Toast";

type Props = {
	match: any
};

type State = {
	room: Room,
	isLoading: boolean,
	shouldRedirect: boolean
};

export default class EditRoom extends React.Component<Props, State> {
	source: CancelTokenSource = CancelToken.source();

	state = {
		room: new Room(
			"Uninitialized Room",
			"Uninitialized Room (probably an error)",
			([]: Measurement[])
		),
		isLoading: true,
		shouldRedirect: false
	};

	fetchRoom = (roomId: number) => {
		return axios.get("/rooms/" + roomId, {
			cancelToken: this.source.token
		});
	};

	saveRoom = (room: Room) => {
		return axios.post(
			`/projects/${this.props.match.params.projectId}/rooms`,
			room,
			{
				cancelToken: this.source.token
			}
		);
	};

	onSubmit = (showToast?: (toast: ToastMetadata) => void) => {
		this.saveRoom(this.state.room)
			.then(result => {
				if (result.status === 201) {
					const toast: ToastMetadata = {
						status: "ok",
						children: "Raum abgespeichert"
					};
					if (showToast) {
						showToast(toast);
					}
					this.setState({ shouldRedirect: true });
				}
			})
			.catch(error => {
				const toast: ToastMetadata = {
					status: "critical",
					children: "Raum konnte nicht gespeichert werden"
				};
				if (showToast) {
					showToast(toast);
				}
			});
	};

	onRoomChanged = (key: string, value: AllInputTypes) => {
		this.setState((prevState, props) => {
			prevState.room = Object.assign(prevState.room, {
				[key]: value
			});
			return prevState;
		});
	};

	componentDidMount() {
		const roomId = this.props.match.params.roomId;

		if (typeof roomId === "undefined") {
			this.setState({
				room: new Room("", "", ([]: Measurement[])),
				isLoading: false
			});
		} else {
			this.fetchRoom(roomId).then(result => {
				const room = Room.fromObject(result.data);
				this.setState({
					room: room,
					isLoading: false
				});
			});
		}
	}

	render() {
		if (this.state.isLoading) {
			return <Loading />;
		}
		return (
			<ToastContext.Consumer>
				{(showToast: any) => (
					<Form
						heading="Raum bearbeiten"
						onSubmit={() => this.onSubmit(showToast)}
					>
						<FormField label="Name">
							<TextInput
								name="name"
								placeholder="Raumname eingeben"
								value={this.state.room.name}
								onDOMChange={inputHandler(this.onRoomChanged)}
							/>
						</FormField>
						<FormField label="Beschreibung">
							<TextInput
								name="description"
								placeholder="Beschreibung eingeben"
								value={this.state.room.description}
								onDOMChange={inputHandler(this.onRoomChanged)}
							/>
						</FormField>
						{this.state.shouldRedirect && (
							<Redirect to={"/projects/" + this.props.match.params.projectId} />
						)}
					</Form>
				)}
			</ToastContext.Consumer>
		);
	}
}
