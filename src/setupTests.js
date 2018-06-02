const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-16");

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	clear: jest.fn(),
	removeItem: jest.fn()
};

global.localStorage = localStorageMock;
global.sessionStorage = localStorageMock;
