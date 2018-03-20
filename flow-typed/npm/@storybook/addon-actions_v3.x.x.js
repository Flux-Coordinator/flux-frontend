// flow-typed signature: 9f7284fc113607b916f1c64b0640c2a2
// flow-typed version: 1709d3212d/@storybook/addon-actions_v3.x.x/flow_>=v0.25.x

declare module "@storybook/addon-actions" {
	declare type Action = (name: string) => Function;
	declare type DecorateFn = (args: Array<any>) => Array<any>;

	declare module.exports: {
		action: Action,
		decorateAction(args: Array<DecorateFn>): Action
	};
}
