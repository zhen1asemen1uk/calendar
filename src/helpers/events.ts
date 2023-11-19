import { v4 as uuidv4 } from "uuid";

import { IEvent } from "../reducers/eventReducer/type";

export const getEventsFromStorage = (gte?: string, lte?: string) => {
	const eventsFromLS = localStorage.getItem("events");

	if (!eventsFromLS) return [];

	const events = JSON.parse(eventsFromLS);

	if (gte) {
		return events.filter((event: IEvent) => +event.date >= +gte);
	}

	if (lte) {
		return events.filter((event: IEvent) => +event.date <= +lte);
	}

	return events;
};

export const addEventToStorage = ({
	title,
	desc,
	date,
	created_at,
	updated_at,
}: IEvent) => {
	const events = getEventsFromStorage();

	const newEvent: IEvent = {
		_id: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
		title,
		desc,
		date,
		created_at,
		updated_at,
	};

	events.push(newEvent);

	localStorage.setItem("events", JSON.stringify(events));

	return newEvent;
};

export const updateEventToStorage = ({
	_id,
	title,
	desc,
	date,
	created_at,
	updated_at,
}: IEvent) => {
	const events = getEventsFromStorage() as IEvent[];

	const newEvents = events.map((event) => {
		if (event._id === _id) {
			return {
				...event,
				title,
				desc,
				date,
				created_at,
				updated_at,
			};
		} else {
			return event;
		}
	});

	localStorage.setItem("events", JSON.stringify(newEvents));

	return newEvents;
};

export const deleteEventFromStorage = (_id: string) => {
	const events = getEventsFromStorage() as IEvent[];

	const newEvents = events.filter((event) => event._id !== _id);

	localStorage.setItem("events", JSON.stringify(newEvents));

	return newEvents;
};

export const getEventByIDFromStorage = (_id: string) => {
	const events = getEventsFromStorage() as IEvent[];

	const event = events.find((event) => event._id === _id);

	return event;
};

export const searchEventFromStorage = (search: string) => {
	const events = getEventsFromStorage() as IEvent[];

	const res = events.filter((word) => {
		return word.title.includes(search) || word.desc.includes(search);
	});

	const filterEventsData = res.filter(
		(v, i, a) => a.findIndex((t) => t._id === v._id) === i
	);

	return filterEventsData;
};
