// flow-typed signature: 64850c161373321ab9eabcceb1268d56
// flow-typed version: 5edd39ab2e/@storybook/addon-actions_v3.x.x/flow_>=v0.25.x

declare module "@storybook/addon-actions" {
	declare type Action = (name: string) => (...args: Array<any>) => void;
	declare type DecorateFn = (args: Array<any>) => Array<any>;

	declare module.exports: {
		action: Action,
		decorateAction(args: Array<DecorateFn>): Action
	};
}
