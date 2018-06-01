// @flow

const connectionStates = {
	UNKNOWN: "UNKNOWN",
	CONNECTED: "CONNECTED",
	DISCONNECTED: "DISCONNECTED"
};

export type ConnectionState = $Keys<typeof connectionStates>;

export type ServerState = {
	uri?: string,
	connectionState: ConnectionState
};
