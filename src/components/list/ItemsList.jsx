// @flow
import * as React from "react";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";
import ListPlaceholder from "grommet-addons/components/ListPlaceholder";
import Spinning from "grommet/components/icons/Spinning";

type Props<T> = {
	items?: ?(T[]),
	keyFunc: (item: T) => ?number,
	selectable?: boolean | "multiple",
	onSelect?: (selected: number | number[]) => void,
	loading?: boolean,
	ItemRenderer: React.ComponentType<{ item: T }>,
	listItemProperties?: {
		margin?: "none" | "small" | "medium" | "large",
		pad?: "none" | "small" | "medium" | "large",
		size?:
			| "auto"
			| "xsmall"
			| "small"
			| "medium"
			| "large"
			| "xlarge"
			| "xxlarge"
			| "full"
	}
};

export default function ItemsList<T>({
	items,
	keyFunc,
	onSelect,
	selectable,
	loading,
	ItemRenderer,
	listItemProperties
}: Props<T>) {
	if (loading) {
		return <Spinning size="large" />;
	}

	const unfilteredTotal = items ? items.length : 0;
	const filteredTotal = items ? items.length : 0;

	return (
		<React.Fragment>
			<ListPlaceholder
				unfilteredTotal={unfilteredTotal}
				filteredTotal={filteredTotal}
			/>
			<List selectable={selectable} onSelect={onSelect}>
				{items &&
					items.map(item => (
						<ListItem key={keyFunc(item)} {...listItemProperties}>
							<ItemRenderer item={item} />
						</ListItem>
					))}
			</List>
		</React.Fragment>
	);
}

ItemsList.defaultProps = {
	loading: false,
	selectable: true,
	listItemProperties: {
		pad: {
			horizontal: "none",
			vertical: "medium"
		}
	}
};
