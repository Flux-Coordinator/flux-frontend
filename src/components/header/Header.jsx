import * as React from "react";
import Title from "grommet/components/Title";
import GrommetHeader from "grommet/components/Header";

type Props = {
	title: string,
	toggler: React.Node
};

export default function Header({ title, toggler }: Props) {
	return (
		<GrommetHeader pad="small" colorIndex="neutral-1">
			{toggler}
			<Title>{title}</Title>
		</GrommetHeader>
	);
}
