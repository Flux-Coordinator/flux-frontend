// @flow

export type Measurement = {
	id: string,
	description: string,
	date: string
};

export type Room = {
	id: string,
	name: string,
	measurements: Measurement[]
};

export type Project = {
	id: string,
	name: string,
	rooms: Room[]
};
