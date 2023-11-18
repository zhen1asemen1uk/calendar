import moment from "moment";
import api from ".";

import { isLoading, isModal } from "../reducers/authReducer/authSlice";
import { todayMonth } from "../reducers/monthSlice/monthSlice";
import {
	addEvent,
	deleteEvent,
	getAllEvents,
	getEventByUserID,
	getEventByID,
	updateEvent,
	search,
	getEventByUserIDAndTime,
} from "../reducers/eventReducer/eventSlice";
import { AppDispatch } from "../reducers/store";
import {
	addEventToStorage,
	getEventByIDFromStorage,
	getEventsFromStorage,
	updateEventToStorage,
} from "../helpers/events";

export const eventAPI = {
	getAllEvents() {
		return async (dispatch: AppDispatch) => {
			try {
				dispatch(isLoading(true));
				const dataEvents = await api.get(`/api/event`);

				return dispatch(getAllEvents(dataEvents.data));
			} catch (error) {
				console.error(error);

				const events = getEventsFromStorage();
				return dispatch(getAllEvents(events));
			} finally {
				dispatch(isLoading(false));
			}
		};
	},

	getEventByID(id: string) {
		return async (dispatch: AppDispatch) => {
			try {
				dispatch(isLoading(true));
				const dataEvents = await api.get(`/api/event/${id}`);

				return dispatch(getEventByID(dataEvents.data));
			} catch (error) {
				console.error(error);

				const events = getEventByIDFromStorage(id);
				return dispatch(getEventByID(events));
			} finally {
				dispatch(isLoading(false));
			}
		};
	},
	getEventByUserID(id: string) {
		return async (dispatch: AppDispatch) => {
			try {
				dispatch(isLoading(true));
				const dataEvents = await api.get(`/api/event/${id}/user`);

				return dispatch(getEventByUserID(dataEvents.data));
			} catch (error) {
				console.error(error);
			} finally {
				dispatch(isLoading(false));
			}
		};
	},
	getEventByUserIDAndTime(id: string, gte: string, lte: string) {
		return async (dispatch: AppDispatch) => {
			try {
				dispatch(isLoading(true));
				const dataEvents = await api.get(`/api/event/${id}/${gte}/${lte}`);

				return dispatch(getEventByUserIDAndTime(dataEvents.data));
			} catch (error) {
				console.error(error);

				const events = getEventsFromStorage();
				return dispatch(getEventByUserIDAndTime(events));
			} finally {
				dispatch(isLoading(false));
			}
		};
	},
	addEvent(title: string, desc: string, date: string, time: string) {
		addEventToStorage({ title, desc, date, time });

		return async (dispatch: AppDispatch) => {
			try {
				dispatch(isLoading(true));
				const newEvent = await api.post(`/api/event/`, {
					title,
					desc,
					date,
					time,
				});

				return dispatch(addEvent(newEvent.data));
			} catch (error) {
				console.error(error);
			} finally {
				dispatch(isModal(false));
				dispatch(isLoading(false));
			}
		};
	},
	updateEvent(
		_id: string,
		title: string,
		desc: string,
		date: string,
		time: string
	) {
		return async (dispatch: AppDispatch) => {
			updateEventToStorage({ _id, title, desc, date, time });
			try {
				dispatch(isLoading(true));
				const dataEvents = await api.patch(`/api/event/${_id}`, {
					title: title,
					desc: desc,
					date: date,
					time: time,
				});

				return dispatch(updateEvent(dataEvents.data));
			} catch (error) {
				console.error(error);
			} finally {
				dispatch(todayMonth(moment(date, "DD.MM.YYYY")));
				dispatch(isModal(false));
				dispatch(isLoading(false));
			}
		};
	},
	deleteEvent(id: string, date: string) {
		return async (dispatch: AppDispatch) => {
			try {
				dispatch(isLoading(true));
				const deletedEvent = await api.delete(`/api/event/${id}`);
				return dispatch(deleteEvent(deletedEvent.data));
			} catch (error) {
				console.error(error);
			} finally {
				dispatch(todayMonth(moment(date, "DD.MM.YYYY")));
				dispatch(isModal(false));
				dispatch(isLoading(false));
			}
		};
	},
	search(data: string) {
		return async (dispatch: AppDispatch) => {
			try {
				dispatch(isLoading(true));

				return dispatch(search(data));
			} catch (error) {
				console.error(error);
			} finally {
				dispatch(isLoading(false));
			}
		};
	},
};
