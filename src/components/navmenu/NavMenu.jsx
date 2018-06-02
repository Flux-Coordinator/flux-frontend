// @flow
import * as React from "react";
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";

import AuthenticationService from "./../../utils/AuthenticationService";

type Props = {
	onNavigate: ?() => void
};

export default function NavMenu({ onNavigate }: Props) {
	return (
		<Menu fill pad="none" primary>
			<Anchor path={{ path: "/", index: true }} onClick={onNavigate}>
				Dashboard
			</Anchor>
			<Anchor path="/projects" onClick={onNavigate}>
				Projekte
			</Anchor>
			<Anchor path="/import" onClick={onNavigate}>
				Import / Export
			</Anchor>
			<Anchor path="/settings" onClick={onNavigate}>
				Einstellungen
			</Anchor>
			<Anchor
				path="/login"
				onClick={() => {
					AuthenticationService.logout();
					if (onNavigate) {
						onNavigate();
					}
				}}
			>
				Abmelden
			</Anchor>
		</Menu>
	);
}

NavMenu.defaultProps = {
	onNavigate: null
};
