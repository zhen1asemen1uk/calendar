import axios from "axios";

import api from ".";
import {
	isLoading,
	login,
	logout,
	password_reset,
	register,
} from "../reducers/authReducer/authSlice";
import { getEventByUserIDAndTime } from "../reducers/eventReducer/eventSlice";
import { AppDispatch } from "../reducers/store";

const API_URL = process.env.REACT_APP_HOST;

export const authAPI = {
	register(
		login: string,
		password: string,
		password_confirm: string,
		email: string
	) {
		return async function (dispatch: AppDispatch) {
			try {
				dispatch(isLoading(true));
				const dataRegister = await api.post(`/api/auth/register`, {
					login: login,
					password: password,
					password_confirm: password_confirm,
					email: email,
				});

				return dispatch(register(dataRegister.data));
			} catch (error) {
				console.log(`Error register ${error}`);
			} finally {
				dispatch(isLoading(false));
			}
		};
	},

	login(loginName: string, password: string) {
		return async function (dispatch: AppDispatch) {
			try {
				dispatch(isLoading(true));
				const dataLogin = await api.post(`/api/auth/login`, {
					login: loginName,
					password: password,
				});
				// console.log(dataLogin.data.user.id);
				return dispatch(login(dataLogin.data));
			} catch (error) {
				console.log(`Error login ${error}`);
			} finally {
				dispatch(isLoading(false));
			}
		};
	},

	verify(link: string) {
		return async function (dispatch: AppDispatch) {
			try {
				dispatch(isLoading(true));
				const dataLogin = await api.get(`/activate/${link}`);
				// return dispatch(verify(dataLogin ));
				return dispatch(login(dataLogin.data));
			} catch (error) {
				console.log(`Error login ${error}`);
			} finally {
				dispatch(isLoading(false));
			}
		};
	},

	// password_reset(login: string, newPassword: string) {
	password_reset(login: string) {
		return async function (dispatch: AppDispatch) {
			try {
				dispatch(isLoading(true));
				const resetData = await api.post(`/api/auth/password-reset`, {
					login: login,
					// newPassword: newPassword,
				});

				return dispatch(password_reset(resetData));
			} catch (error) {
				console.log(`Error login ${error}`);
			} finally {
				dispatch(isLoading(false));
			}
		};
	},

	password_reset_link(newPass: string) {
		return async function (dispatch: AppDispatch) {
			try {
				const token = window.location.pathname.split("/")[2];
				dispatch(isLoading(true));

				const resetData = await api.post(`/api/auth/password-reset/${token}`, {
					newPassword: newPass,
				});
				return dispatch(password_reset(resetData));
			} catch (error) {
				console.log(`Error login ${error}`);
			} finally {
				dispatch(isLoading(false));
			}
		};
	},

	logout() {
		return async (dispatch: AppDispatch) => {
			try {
				dispatch(isLoading(true));
				// const dataLogout = await api.post(`/api/auth/logout`);
				await api.post(`/api/auth/logout`);
				dispatch(getEventByUserIDAndTime([]));

				return dispatch(logout());
			} catch (error) {
				console.log(`Error logout ${error}`);
			} finally {
				dispatch(isLoading(false));
			}
		};
	},

	checkAuth() {
		return async () => {
			try {
				const check = await axios.get(
					`

         ${API_URL}/api/auth/refresh`,
					{ withCredentials: true }
				);

				localStorage.setItem("token", check.data.accessToken);

				const obj = JSON.stringify(check.data.user);
				localStorage.setItem("userData", obj);
			} catch (error) {
				console.log(`Error check refresh ${error}`);
			}
		};
	},
};
