import { FC, ReactNode, useEffect } from "react";

import { eventAPI } from "../../API/eventAPI";
import { isModal, modalChildren } from "../../reducers/authReducer/authSlice";
import CalendarMonth from "./CalendarMonth";
import { useAppDispatch, useAppSelector } from "../../hooks";

const CalendarMonthConteiner: FC = () => {
	const dispatch = useAppDispatch();

	const { user, isAuth } = useAppSelector((state) => state.authState);

	const { today } = useAppSelector((state) => state.monthState);
	const { eventDataForMonth } = useAppSelector((state) => state.eventState);

	const weekStartDay = today.clone().startOf("month").startOf("week");

	// for calculate day current month
	const monthStartDay = today.clone().startOf("month").format("X");
	const monthEndDay = today.clone().endOf("month").format("X");

	const day = weekStartDay.clone().subtract(1, "day");

	const isModalSet = (set: boolean, child: ReactNode | null) => {
		dispatch(isModal(set));
		dispatch(modalChildren(child));
	};

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

	const arrDays = [...Array(42)].map(() => {
		return day.add(1, "day").clone();
	});

	return (
		<CalendarMonth
			today={today}
			isAuth={isAuth}
			arrDays={arrDays}
			eventDataForMonth={eventDataForMonth}
			isModalSet={isModalSet}
		/>
	);
};

export default CalendarMonthConteiner;
