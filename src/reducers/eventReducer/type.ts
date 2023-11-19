// Define a type for the slice state
export interface IEventsSlice {
	eventsData: IEvent[];
	eventDataByID: IEvent[];
	eventDataForMonth: IEvent[];
	eventDataByUserID: IEvent[];
	filterEvents: IEvent[];
}

export interface IEvent {
	title: string;
	desc: string;
	date: string;
	_id?: string;
	created_at: string;
	updated_at: string;
}
