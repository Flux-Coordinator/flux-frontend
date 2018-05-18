// @flow
import * as React from "react";
import { shallow } from "enzyme";

import ItemsList from "./ItemsList";

type TestItemType = {
	name: string,
	id: number
};

describe("<ItemsList />", () => {
	it("should render", () => {
		const items: TestItemType[] = [
			{ name: "Item1", id: 1 },
			{ name: "Item2", id: 2 },
			{ name: "Item3", id: 3 },
			{ name: "Item4", id: 4 },
			{ name: "Item5", id: 5 }
		];
		shallow(
			<ItemsList
				items={items}
				keyFunc={o => o.id}
				ItemRenderer={TestItemRenderer}
			/>
		);
	});
});

function TestItemRenderer({ item }) {
	return item.name;
}
