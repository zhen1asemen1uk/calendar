import { FC, useEffect, useMemo } from "react";
import moment from "moment";

import { useAppDispatch, useAppSelector } from "../../hooks";

import { eventAPI } from "../../API/eventAPI";

import CalendarMonth from "./CalendarMonth";

const CalendarMonthConteiner: FC = () => {
	const dispatch = useAppDispatch();

	const { user, isAuth } = useAppSelector((state) => state.authState);
	const { today } = useAppSelector((state) => state.monthState);
	const { eventDataForMonth } = useAppSelector((state) => state.eventState);

	const weekStartDay = moment
		.unix(+today)
		.clone()
		.startOf("month")
		.startOf("week");

	// for calculate day current month
	const monthStartDay = moment
		.unix(+today)
		.clone()
		.startOf("month")
		.format("X");
	const monthEndDay = moment.unix(+today).clone().endOf("month").format("X");

	const day = weekStartDay.clone().subtract(1, "day");

	useEffect(() => {
		if (user) {
			const getEventsInMonth = (user_id: string, gte: string, lte: string) => {
				dispatch(eventAPI.getEventByUserIDAndTime(user_id, gte, lte));
			};

			getEventsInMonth(user.id, monthStartDay, monthEndDay);
		} else {
			dispatch(
				eventAPI.getEventByUserIDAndTime("", monthStartDay, monthEndDay)
			);
		}
	}, [today, monthStartDay, monthEndDay, dispatch, user]);

	// create array days for month
	const arrDays = useMemo(() => {
		return [...Array(42)].map(() => {
			return day.add(1, "day").clone();
		});
	}, [day]);

	return (
		<CalendarMonth
			today={today}
			isAuth={isAuth}
			arrDays={arrDays}
			eventDataForMonth={eventDataForMonth}
		/>
	);
};

export default CalendarMonthConteiner;
