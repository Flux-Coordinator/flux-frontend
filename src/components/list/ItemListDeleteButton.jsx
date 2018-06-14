// @flow
import * as React from "react";
import Button from "grommet/components/Button";
import TrashIcon from "grommet/components/icons/base/Trash";

type Props = {
	onClick: () => void
};

export default function ItemListDeleteButton({ onClick }: Props) {
	return (
		<Button
			icon={<TrashIcon />}
			hoverIndicator={{ background: "critical" }}
			onClick={onClick}
		/>
	);
}
