import { Moment } from "moment-timezone";

// Define a type for the slice state
export interface IEventsSlice {
	_startWeek_Monday: Moment;
	today: string;
}
