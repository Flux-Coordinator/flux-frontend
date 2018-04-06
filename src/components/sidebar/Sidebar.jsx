// @flow
import * as React from "react";
import GrommetSidebar from "grommet/components/Sidebar";
import Box from "grommet/components/Box";
import Footer from "grommet/components/Footer";

type Props = {
	header: React.Node,
	children: React.Node,
	footer?: React.Node
};

export default function Sidebar({ header, children, footer }: Props) {
	return (
		<GrommetSidebar colorIndex="neutral-1" size="small">
			{header}
			<Box flex="grow" pad="none" justify="start">
				{children}
			</Box>
			<Footer pad="medium">{footer}</Footer>
		</GrommetSidebar>
	);
}

Sidebar.defaultProps = {
	footer: null
};
