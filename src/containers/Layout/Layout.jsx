// @flow
import * as React from "react";
import Responsive from "grommet/utils/Responsive";
import Split from "grommet/components/Split";
import Box from "grommet/components/Box";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Button from "grommet/components/Button";
import SidebarIcon from "grommet/components/icons/base/Sidebar";

import Project from "../../models/Project";
import NavMenu from "../../components/navmenu/NavMenu";
import Sidebar from "../../components/sidebar/Sidebar";

type Prop = {
	children?: React.Node,
	projects: Project[]
};

type State = {
	isMobileScreen: boolean,
	sidebarOpenOnMobile: boolean
};

type TogglerProps = {
	onToggle: () => void
};

function Toggler({ onToggle }: TogglerProps) {
	return (
		<Button
			id="sidebar-toggler"
			icon={<SidebarIcon />}
			plain
			onClick={onToggle}
		/>
	);
}

export default class Layout extends React.Component<Prop, State> {
	state = {
		isMobileScreen: false,
		sidebarOpenOnMobile: false
	};

	componentDidMount() {
		this.handleResponsive = Responsive.start(this.handleResponsive);
	}

	componentWillUnmount() {
		this.handleResponsive.stop();
	}

	handleResponsive = (small: boolean) => {
		this.setState(() => ({ isMobileScreen: small }));
	};

	toggleSidebarOnMobile = () => {
		this.setState((prevState: State) => ({
			sidebarOpenOnMobile: !prevState.sidebarOpenOnMobile
		}));
	};

	render() {
		const { children, projects } = this.props;
		const title = "Flux-Coordinator";

		const sidebarToggler: React.Node = this.state.isMobileScreen ? (
			<Toggler onToggle={this.toggleSidebarOnMobile} />
		) : null;
		return (
			<Split
				flex="right"
				showOnResponsive={this.state.sidebarOpenOnMobile ? "both" : "priority"}
				separator={false}
			>
				<Sidebar title={title} toggler={sidebarToggler}>
					<NavMenu projects={projects} />
				</Sidebar>
				<Box colorIndex="light-2" basis="full" full primary>
					{this.state.isMobileScreen && (
						<Header fixed pad="small" colorIndex="neutral-1">
							{sidebarToggler}
							<Title>{title}</Title>
						</Header>
					)}
					<Box>{children}</Box>
				</Box>
			</Split>
		);
	}
}
