// @flow
import * as React from "react";

import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import Typography from "material-ui/Typography";
import Hidden from "material-ui/Hidden";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import Toolbar from "material-ui/Toolbar";
import MenuIcon from "material-ui-icons/Menu";
import NavMenu from "../components/navmenu/NavMenu";

import ErrorBoundary from "./ErrorBoundary";
import { Project } from "../types/Models";

type Prop = {
	classes: any,
	theme: any,
	children: React.Node,
	projects: Project[]
};

type State = {
	mobileOpen: boolean
};

const drawerWidth = 240;
const styles = theme => ({
	root: {
		flexGrow: 1,
		zIndex: 1,
		overflow: "hidden",
		position: "relative",
		display: "flex",
		width: "100%"
	},
	appBar: {
		position: "absolute",
		marginLeft: drawerWidth,
		[theme.breakpoints.up("md")]: {
			width: `calc(100% - ${drawerWidth}px)`
		}
	},
	navIconHide: {
		[theme.breakpoints.up("md")]: {
			display: "none"
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		[theme.breakpoints.up("md")]: {
			position: "relative"
		}
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3
	}
});

class Layout extends React.Component<Prop, State> {
	state = {
		mobileOpen: false
	};

	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen });
	};

	render() {
		const { children, classes, theme, projects } = this.props;
		const drawer = (
			<div>
				<div className={classes.toolbar} />
				<Divider />
				<ErrorBoundary>
					<NavMenu projects={projects} />
				</ErrorBoundary>
			</div>
		);

		return (
			<div className={classes.root}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerToggle}
							className={classes.navIconHide}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="inherit" noWrap>
							Flux Coordinator
						</Typography>
					</Toolbar>
				</AppBar>
				<Hidden mdUp>
					<Drawer
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={this.state.mobileOpen}
						onClose={this.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						variant="permanent"
						open
						classes={{
							paper: classes.drawerPaper
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{children}
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Layout);
