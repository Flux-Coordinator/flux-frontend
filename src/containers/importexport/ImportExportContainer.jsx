// @flow
import * as React from "react";
import axios, { CancelToken } from "axios";
import ContentBox from "../../components/contentBox/ContentBox";

import ImportComponent from "../../components/importexport/Import";
import ExportComponent from "../../components/importexport/Export";

type Props = {};
type Status = {
	showWizard: boolean
};

export default class ImportExportContainer extends React.Component<
	Props,
	Status
> {
	source: any = CancelToken.source();
	state = {
		showWizard: false
	};

	uploadFile = (file: ?File) => {
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				const fileAsBinaryString = reader.result;
				axios
					.post("/import", fileAsBinaryString, {
						headers: { "Content-Type": "application/json" }
					})
					.then(response => {
						console.log(response);
					})
					.catch(error => {
						console.log(error);
					});
			};
			reader.readAsText(file, "utf-8");
		}
	};

	render() {
		return (
			<ContentBox heading="Import / Export">
				<ImportComponent onUpload={this.uploadFile} />
				<ExportComponent />
			</ContentBox>
		);
	}
}
