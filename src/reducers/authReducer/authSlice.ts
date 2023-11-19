import { createSlice } from "@reduxjs/toolkit";
import { IAuthSlice } from "./type";
import { authAPI } from "../../API/authAPI";

export const initialState: IAuthSlice = {
	user: null,
	passwordReset: { data: "", error: "" },
	isAuth: false,
	isLoading: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		register(state, action) {
			if (typeof action.payload == "object") {
				state.user = action.payload.user;
			} else {
				state.user = action.payload;
			}
		},
		login(state, action) {
			// if (typeof action.payload == "object") {
			localStorage.setItem("token", action.payload.accessToken);

			const obj = JSON.stringify(action.payload.user);
			localStorage.setItem("userData", obj);

			state.isAuth = true;

			state.user = action.payload.user;
			// } else {
			//     state.user = action.payload;
			// }
		},
		verify(state, action) {
			// const verify = authAPI.verify(action.payload.link);
			authAPI.verify(action.payload.link);

			// state.user = verify.data;
		},
		password_reset(state, action) {
			state.passwordReset = action.payload;
		},
		password_reset_link(state, action) {
			// const password_reset_link = authAPI.password_reset_link(
			//     action.payload.link
			// );
			authAPI.password_reset_link(action.payload.link);

			// state.user = password_reset_link.data;
		},
		logout(state) {
			state.isAuth = false;

			document.cookie =
				"refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			localStorage.removeItem(`token`);
			localStorage.removeItem(`userData`);

			state.user = null;
		},
		isLoading(state, action) {
			state.isLoading = action.payload;
		},
	},
});

export const {
	register,
	login,
	verify,
	password_reset,
	password_reset_link,
	logout,
	isLoading,
} = authSlice.actions;

export default authSlice.reducer;
