// @flow
import * as React from "react";
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";

type Props = {
	onNavigate?: () => void
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
			<Anchor onClick={onNavigate}>Abmelden</Anchor>
		</Menu>
	);
}

NavMenu.defaultProps = {
	onNavigate: null
};
