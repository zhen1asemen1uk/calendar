import api from ".";

import { isLoading } from "../reducers/authReducer/authSlice";

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
	deleteEventFromStorage,
	getEventByIDFromStorage,
	getEventsFromStorage,
	searchEventFromStorage,
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

				const events = getEventsFromStorage(gte, lte);

				return dispatch(getEventByUserIDAndTime(events));
			} finally {
				dispatch(isLoading(false));
			}
		};
	},
	addEvent(
		title: string,
		desc: string,
		date: string,
		created_at: string,
		updated_at: string
	) {
		const newEventLS = addEventToStorage({
			title,
			desc,
			date,
			created_at,
			updated_at,
		});
		// TO DO: need transform date to unix and UTC!!!

		return async (dispatch: AppDispatch) => {
			try {
				dispatch(isLoading(true));
				const newEvent = await api.post(`/api/event/`, {
					title,
					desc,
					date,
				});

				return dispatch(addEvent(newEvent.data));
			} catch (error) {
				console.error(error);

				return dispatch(addEvent(newEventLS));
			} finally {
				dispatch(isLoading(false));
			}
		};
	},
	updateEvent(
		_id: string,
		title: string,
		desc: string,
		date: string,
		created_at: string,
		updated_at: string
	) {
		return async (dispatch: AppDispatch) => {
			updateEventToStorage({ _id, title, desc, date, created_at, updated_at });

			try {
				dispatch(isLoading(true));
				const dataEvents = await api.patch(`/api/event/${_id}`, {
					title,
					desc,
					date,
					created_at,
					updated_at,
				});

				return dispatch(updateEvent(dataEvents.data));
			} catch (error) {
				console.error(error);

				const updatedEvent = updateEventToStorage({
					_id,
					title,
					desc,
					date,
					created_at,
					updated_at,
				});

				return dispatch(updateEvent(updatedEvent));
			} finally {
				dispatch(isLoading(false));
			}
		};
	},
	deleteEvent(id: string) {
		return async (dispatch: AppDispatch) => {
			try {
				dispatch(isLoading(true));
				const deletedEvent = await api.delete(`/api/event/${id}`);
				return dispatch(deleteEvent(deletedEvent.data));
			} catch (error) {
				console.error(error);

				const deletedEvent = deleteEventFromStorage(id);
				return dispatch(deleteEvent(deletedEvent));
			} finally {
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

				const res = searchEventFromStorage(data);
				return dispatch(search(res));
			} finally {
				dispatch(isLoading(false));
			}
		};
	},
};
