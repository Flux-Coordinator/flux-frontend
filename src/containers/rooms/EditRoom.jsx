// @flow
import * as React from "react";
import Image from "grommet/components/Image";
import NumberInput from "grommet/components/NumberInput";
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

	convertFileToString: (file: File) => Promise<string | ArrayBuffer> = (
		file: File
	) => {
		return new Promise(function(resolve, reject) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				resolve(reader.result);
			};

			reader.onerror = error => {
				reject(error);
			};
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
		this.setState({ isLoading: true });
		this.saveRoom(this.state.room)
			.then(result => {
				if (result.status === 201) {
					if (showToast) {
						showToast({
							status: "ok",
							children: "Raum abgespeichert"
						});
					}
					this.setState({ shouldRedirect: true });
				}
			})
			.catch(error => {
				this.setState({ isLoading: false });
				if (showToast) {
					showToast({
						status: "critical",
						children: "Raum konnte nicht gespeichert werden"
					});
				}
			});
	};

	onRoomChanged = (key: string, value: AllInputTypes) => {
		this.setState(prevState => {
			prevState.room = Object.assign(prevState.room, {
				[key]: value
			});
			return prevState;
		});
	};

	onRoomPlanChanged = (key: string, value: AllInputTypes) => {
		if (value && value[0]) {
			this.convertFileToString(value[0]).then(result => {
				this.setState(prevState => {
					prevState.room = Object.assign(prevState.room, {
						[key]: result
					});
					return prevState;
				});
			});
		}
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
		if (this.state.shouldRedirect) {
			return <Redirect to={"/projects/" + this.props.match.params.projectId} />;
		}

		if (this.state.isLoading) {
			return <Loading />;
		}

		const { room } = this.state;

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
								required
								placeHolder="Raumname eingeben"
								value={room.name}
								onDOMChange={inputHandler(this.onRoomChanged)}
							/>
						</FormField>
						<FormField label="Beschreibung">
							<TextInput
								name="description"
								placeHolder="Beschreibung eingeben"
								value={room.description}
								onDOMChange={inputHandler(this.onRoomChanged)}
							/>
						</FormField>
						<FormField label="Raumgrösse (in m²)">
							<NumberInput
								name="floorSpace"
								value={room.floorSpace}
								onChange={inputHandler(this.onRoomChanged)}
							/>
						</FormField>
						<FormField label="Raumplan">
							<input
								type="file"
								accept="image/*"
								name="floorPlan"
								onChange={inputHandler(this.onRoomPlanChanged)}
							/>
						</FormField>
						<Image src={room.floorPlan} alt="" />
					</Form>
				)}
			</ToastContext.Consumer>
		);
	}
}
