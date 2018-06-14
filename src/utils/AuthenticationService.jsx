import axios from "axios";
const STORAGE_KEY = "LOGIN_TOKEN";

export default class AuthenticationService {
	/**
	 * Saves the authentication token.
	 * If there was already an authentication token, it will be overridden.
	 */
	static login = (token: string, rememberMe: boolean) => {
		AuthenticationService.logout();
		if (rememberMe) {
			localStorage.setItem(STORAGE_KEY, token);
		} else {
			sessionStorage.setItem(STORAGE_KEY, token);
		}
		axios.defaults.headers.common["Authorization"] = token;
	};

	/**
	 * Logs out the currently logged in user.
	 * If there was no used logged in, nothing happens.
	 */
	static logout = () => {
		localStorage.removeItem(STORAGE_KEY);
		sessionStorage.removeItem(STORAGE_KEY);
		delete axios.defaults.headers.common["Authorization"];
	};

	/**
	 * Returns true, if there is an authentication token stored.
	 * It is still possible that the token was invalidated by the server.
	 */
	static get token() {
		const token =
			localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
		axios.defaults.headers.common["Authorization"] = token;
		return token;
	}
}
