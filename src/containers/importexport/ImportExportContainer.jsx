// @flow
import * as React from "react";
import axios, { CancelToken, CancelTokenSource } from "axios";
import ContentBox from "../../components/contentBox/ContentBox";

import ImportComponent from "../../components/importexport/Import";
import ExportComponent from "../../components/importexport/Export";
import { ToastContext } from "./../../components/toast/ToastContext";

import type { ToastMetadata } from "./../../components/toast/Toast";

type Props = {};
type State = {
	showWizard: boolean,
	isLoading: boolean
};

export default class ImportExportContainer extends React.Component<
	Props,
	State
> {
	source: CancelTokenSource = CancelToken.source();
	state = {
		showWizard: false,
		isLoading: false
	};

	uploadFile = (file: ?File, showToast: ToastMetadata => void) => {
		if (file) {
			this.setState({ isLoading: true });
			const reader = new FileReader();
			reader.onload = () => {
				const fileAsBinaryString = reader.result;
				axios
					.post("/import", fileAsBinaryString, {
						headers: { "Content-Type": "application/json" }
					})
					.then(response => {
						this.setState({ isLoading: false });
						if (showToast) {
							showToast({
								status: "ok",
								children: response.data
							});
						}
					})
					.catch(error => {
						this.setState({ isLoading: false });
						if (showToast) {
							showToast({
								status: "critical",
								children: error.data
							});
						}
					});
			};
			reader.readAsText(file, "utf-8");
		}
	};

	render() {
		return (
			<ToastContext.Consumer>
				{(showToast: any) => (
					<ContentBox heading="Import / Export">
						<ImportComponent
							onUpload={file => this.uploadFile(file, showToast)}
							isLoading={this.state.isLoading}
						/>
						<ExportComponent />
					</ContentBox>
				)}
			</ToastContext.Consumer>
		);
	}
}
