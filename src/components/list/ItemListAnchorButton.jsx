// @flow
import * as React from "react";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";

type Props = {
	path: string,
	children: React.Node
};

export default function ItemListAnchorButton({ path, children }: Props) {
	return (
		<Button className="custom-list-anchor" fill path={path}>
			<Box alignContent="around">{children}</Box>
		</Button>
	);
}
