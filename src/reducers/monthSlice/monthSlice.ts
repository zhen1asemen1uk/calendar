import moment from "moment";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// _startWeek_Monday: moment.updateLocale("en", { week: { dow: 1 } }), // start week: Monday
	today: localStorage.getItem("dateFilter") || moment().unix().toString(), // day on screen calendar
};

const monthSlice = createSlice({
	name: "month",
	initialState: initialState,
	reducers: {
		prevMonth(state, action) {
			localStorage.setItem("dateFilter", action.payload);
			state.today = action.payload;
		},

		todayMonth(state, action) {
			localStorage.setItem("dateFilter", action.payload);
			state.today = action.payload;
		},
		nextMonth(state, action) {
			localStorage.setItem("dateFilter", action.payload);
			state.today = action.payload;
		},
	},
});

export const { prevMonth, todayMonth, nextMonth } = monthSlice.actions;
export default monthSlice.reducer;
