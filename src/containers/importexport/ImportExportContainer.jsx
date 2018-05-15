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
		console.log(file);
		console.log("TODO: File format is not compatible yet (server-side)!");
		const headers = {
			"Content-Type": "application/json"
		};
		axios
			.post("/import", file, headers)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
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
