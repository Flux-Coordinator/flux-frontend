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
	loading?: boolean,
	ItemRenderer: React.ComponentType<{ item: T }>
};

const listItemPadding = {
	horizontal: "none",
	vertical: "medium"
};

export default function ItemsList<T>({
	items,
	keyFunc,
	selectable,
	loading,
	ItemRenderer
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
			<List selectable={selectable}>
				{items &&
					items.map(item => (
						<ListItem key={keyFunc(item)} pad={listItemPadding}>
							<ItemRenderer item={item} />
						</ListItem>
					))}
			</List>
		</React.Fragment>
	);
}
