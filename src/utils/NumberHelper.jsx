// @flow

export function isNumber(n: number) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
