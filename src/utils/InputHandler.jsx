// @flow
export type AllInputTypes = string | number | boolean | FileList;

export const inputHandler = (callback: (string, AllInputTypes) => void) => (
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
			case "text":
				callback(name, event.currentTarget.value);
				break;
			case "number":
				if (event.currentTarget.value === "") {
					callback(name, 0);
				} else {
					callback(name, parseFloat(event.currentTarget.value));
				}
				break;
			case "file":
				callback(name, event.currentTarget.files);
				break;
			default:
				break;
		}
	}
};
