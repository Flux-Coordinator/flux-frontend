// @flow
import * as React from "react";
import Section from "grommet/components/Section";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Button from "grommet/components/Button";
import Dropzone from "react-dropzone";

type Props = {
	onUpload: (file: File) => void
};

type State = {
	file: ?File
};

export default class Import extends React.Component<Props, State> {
	state = {
		file: null
	};

	onDrop = (acceptedFiles: Array<File>, rejectedFiles: Array<File>) => {
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
		return (
			<Section>
				<Header>
					<Title>Import</Title>
				</Header>
				<Dropzone
					onDrop={this.onDrop}
					multiple={false}
					accept="application/json"
				>
					<p>
						Ziehen Sie die Datei mit den Daten, die Sie importieren möchten in
						dieses Feld.
					</p>
				</Dropzone>
				{this.state.file && (
					<Button
						label={this.state.file.name + " hochladen"}
						onClick={() => this.props.onUpload(this.state.file)}
					/>
				)}
			</Section>
		);
	}
}
