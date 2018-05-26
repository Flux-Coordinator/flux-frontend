// @flow
export type allInputTypes = string | number | boolean;

export const inputHandler = (callback: (string, allInputTypes) => void) => (
	event: SyntheticEvent<HTMLInputElement>
) => {
	if (
		event.currentTarget != null &&
		event.currentTarget.name != null &&
		(event.currentTarget.value != null || event.currentTarget.checked != null)
	) {
		const name = event.currentTarget.name;
		switch (event.currentTarget.type) {
			case "checkbox":
				callback(name, event.currentTarget.checked);
				break;
			case "radio":
				callback(name, event.currentTarget.value);
				break;
			case "text":
			case "number":
				if (event.currentTarget.value === "") {
					callback(name, 0);
					break;
				}
				callback(name, event.currentTarget.value);
				break;
			default:
				break;
		}
	}
};
