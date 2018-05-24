// @flow
import * as React from "react";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";
import Button from "grommet/components/Button";
import AddIcon from "grommet/components/icons/base/Add";

type Props = {
	header: React.Node,
	path?: string
};

export default function ItemListHeader({ header, path }: Props) {
	return (
		<Header size="small">
			<Heading tag="h3" pad="none" margin="none">
				{header}
			</Heading>
			{path && <Button icon={<AddIcon />} path={path} />}
		</Header>
	);
}
