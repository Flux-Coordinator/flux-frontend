// @flow
import * as React from "react";
import GrommetToast from "grommet/components/Toast";

export type ToastMetadata = {
	status: "critical" | "warning" | "ok" | "disabled" | "unknown",
	onClose?: () => void,
	children: React.Node
};

type Props = {
	metadata?: ToastMetadata
};

export default function Toast({ metadata }: Props) {
	if (metadata) {
		return (
			<GrommetToast status={metadata.status} onClose={metadata.onClose}>
				{metadata.children}
			</GrommetToast>
		);
	}
	return null;
}
