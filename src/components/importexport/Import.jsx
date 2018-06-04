// @flow
import * as React from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Button from "grommet/components/Button";
import Dropzone from "react-dropzone";
import DocumentUploadIcon from "grommet/components/icons/base/DocumentUpload";

import type { DZFile as File } from "../../types/File";

type Props = {
	onUpload: (file: ?File) => void,
	isLoading: boolean
};

type State = {
	file: ?File
};

export default class Import extends React.Component<Props, State> {
	constructor() {
		super();
		this.state = {
			file: null
		};
	}

	onDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
		acceptedFiles.forEach(f => {
			// Remove the preview of the file. This avoids memory leaks.
			window.URL.revokeObjectURL(f.preview);
		});

		if (acceptedFiles.length > 1) {
			alert("Es kann höchstens eine Datei importiert werden!");
		} else {
			this.setState({ file: acceptedFiles[0] });
		}
	};

	render() {
		let uploadHandler;
		if (!this.props.isLoading) {
			uploadHandler = () => this.props.onUpload(this.state.file);
		}
		return (
			<Section>
				<Header size="small">
					<Title>Import</Title>
				</Header>
				<Dropzone
					onDrop={this.onDrop}
					multiple={false}
					accept="application/json"
				>
					Ziehen Sie die Datei mit den Daten, die Sie importieren möchten in
					dieses Feld.
				</Dropzone>
				{this.state.file && (
					<Box pad={{ vertical: "small", between: "small" }}>
						<Box>
							<strong>Datei</strong>
							<br />
							{this.state.file.name}
						</Box>
						<Button
							icon={<DocumentUploadIcon />}
							primary
							label={`Hochladen`}
							onClick={uploadHandler}
						/>
					</Box>
				)}
			</Section>
		);
	}
}
