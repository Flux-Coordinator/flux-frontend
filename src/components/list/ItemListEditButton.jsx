// @flow
import * as React from "react";
import Button from "grommet/components/Button";
import EditIcon from "grommet/components/icons/base/Edit";

type Props = {
	path: string
};

export default function ItemListEditButton({ path }: Props) {
	return <Button icon={<EditIcon />} path={path} />;
}
