import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
	_startWeek_Monday: moment.updateLocale("en", { week: { dow: 1 } }), //start week: Monday
	today: moment(), //day on screen calendar
};

const monthSlice = createSlice({
	name: "month",
	initialState: initialState,
	reducers: {
		prevMonth(state, action) {
			state.today = action.payload;
		},

		todayMonth(state, action) {
			state.today = action.payload;
		},
		nextMonth(state, action) {
			state.today = action.payload;
		},
	},
});

export const { prevMonth, todayMonth, nextMonth } = monthSlice.actions;
export default monthSlice.reducer;
