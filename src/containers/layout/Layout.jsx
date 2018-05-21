// @flow
import * as React from "react";
import Responsive from "grommet/utils/Responsive";
import Split from "grommet/components/Split";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";
import SidebarIcon from "grommet/components/icons/base/Sidebar";

import Project from "../../models/Project";
import Header from "../../components/header/Header";
import NavMenu from "../../components/navmenu/NavMenu";
import Sidebar from "../../components/sidebar/Sidebar";
import Loading from "../../components/loading/Loading";

type Prop = {
	children?: React.Node,
	projects: Project[],
	loading: boolean
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
		const { children, projects, loading } = this.props;
		const title = "Flux-Coordinator";

		const sidebarToggler: React.Node = this.state.isMobileScreen ? (
			<Toggler onToggle={this.toggleSidebarOnMobile} />
		) : null;

		const header: React.Node = (
			<Header title={title} toggler={sidebarToggler} />
		);

		const onNavigateCallback: () => void = () => {
			if (this.state.isMobileScreen) {
				this.setState(() => ({ sidebarOpenOnMobile: false }));
			}
		};

		const loadingOrChildren: React.Node = loading ? <Loading /> : children;

		return (
			<Split
				flex="right"
				showOnResponsive={this.state.sidebarOpenOnMobile ? "both" : "priority"}
				separator={false}
			>
				<Sidebar header={header}>
					<NavMenu projects={projects} onNavigate={onNavigateCallback} />
				</Sidebar>
				<Box colorIndex="light-2" basis="full" full primary>
					{this.state.isMobileScreen && header}
					{loadingOrChildren}
				</Box>
			</Split>
		);
	}
}
