import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IEvent, IEventsSlice } from "./type";

export const initialState: IEventsSlice = {
	eventsData: [],
	eventDataByID: [],
	eventDataForMonth: [],
	eventDataByUserID: [],
	filterEvents: [],
};

const eventsSlice = createSlice({
	name: "events",
	initialState,
	reducers: {
		getAllEvents(state, action) {
			state.eventsData = action.payload;
		},
		getEventByID(state, action) {
			state.eventDataByID = action.payload;
		},
		getEventByUserID(state, action) {
			state.eventDataByUserID = action.payload;
		},
		getEventByUserIDAndTime(state, action) {
			state.eventDataForMonth = action.payload;
		},
		addEvent(state, action: PayloadAction<IEvent>) {
			const eventDataForMonth = state.eventDataForMonth;
			state.eventDataForMonth = [...eventDataForMonth, { ...action.payload }];
		},
		updateEvent(state, action) {
			state.eventsData = action.payload;
		},
		deleteEvent(state, action) {
			state.eventsData = action.payload;
		},
		search(state, action) {
			const title = state.eventsData.filter((word) => {
				return word.title.includes(action.payload);
			});
			const content = state.eventsData.filter((word) => {
				return word.desc.includes(action.payload);
			});

			const filterEventsData = title
				.concat(content)
				.filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i);

			state.filterEvents = filterEventsData;
		},
	},
});

export const {
	getAllEvents,
	getEventByID,
	getEventByUserID,
	getEventByUserIDAndTime,
	addEvent,
	updateEvent,
	deleteEvent,
	search,
} = eventsSlice.actions;

export default eventsSlice.reducer;
