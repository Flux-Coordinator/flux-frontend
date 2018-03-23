// @flow
import * as React from "react";
import GrommetSidebar from "grommet/components/Sidebar";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Box from "grommet/components/Box";
import Footer from "grommet/components/Footer";

type Props = {
	title: string,
	children: React.Node,
	footer?: React.Node,
	toggler?: React.Node
};

export default function Sidebar({ title, children, footer, toggler }: Props) {
	return (
		<GrommetSidebar colorIndex="neutral-1" size="small">
			<Header pad="small">
				{toggler}
				<Title>{title}</Title>
			</Header>
			<Box flex="grow" pad="none" justify="start">
				{children}
			</Box>
			<Footer pad="medium">{footer}</Footer>
		</GrommetSidebar>
	);
}

Sidebar.defaultProps = {
	footer: null,
	toggler: null
};
