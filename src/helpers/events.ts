import { v4 as uuidv4 } from "uuid";

import { IEvent } from "../reducers/eventReducer/type";

export const getEventsFromStorage = () => {
	const events = localStorage.getItem("events");

	if (events) {
		return JSON.parse(events);
	} else {
		return [];
	}
};

export const addEventToStorage = ({ title, desc, date, time }: IEvent) => {
	const events = getEventsFromStorage();

	const newEvent = {
		_id: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
		title,
		desc,
		date,
		time,
	};
	events.push(newEvent);
	localStorage.setItem("events", JSON.stringify(events));
};

export const updateEventToStorage = ({
	_id,
	title,
	desc,
	date,
	time,
}: IEvent) => {
	const events = getEventsFromStorage() as IEvent[];

	const newEvents = events.map((event) => {
		if (event._id === _id) {
			return {
				...event,
				title,
				desc,
				date,
				time,
			};
		} else {
			return event;
		}
	});

	localStorage.setItem("events", JSON.stringify(newEvents));
};

export const deleteEventFromStorage = (_id: string) => {
	const events = getEventsFromStorage() as IEvent[];

	const newEvents = events.filter((event) => event._id !== _id);

	localStorage.setItem("events", JSON.stringify(newEvents));
};

export const getEventByIDFromStorage = (_id: string) => {
	const events = getEventsFromStorage() as IEvent[];

	const event = events.find((event) => event._id === _id);

	return event;
};

export const getEventByUserIDFromStorage = (userID: string) => {
	const events = getEventsFromStorage() as IEvent[];

	const event = events.filter((event) => event.userID === userID);

	return event;
};
