import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../../hooks";

import ControlBar from "./ControlBar";
import {
	nextMonth,
	prevMonth,
	todayMonth,
} from "../../../reducers/monthSlice/monthSlice";
import stl from "./ControlBar.module.css";

const ControlBarConteiner = () => {
	const dispatch = useAppDispatch();
	const { today } = useAppSelector((state) => state.monthState);

	// TO DO: need refactoring these handlers (temporary solution)
	const prevHandler = () => {
		dispatch(
			prevMonth(
				moment.unix(+today).clone().subtract(1, "month").unix().toString()
			)
		);
	};

	const todayHandler = () => {
		dispatch(todayMonth(moment().unix().toString()));
	};

	const nextHandler = () => {
		dispatch(
			nextMonth(moment.unix(+today).clone().add(1, "month").unix().toString())
		);
	};

	const changeDateHandler = (date: string) => {
		if (!date) return localStorage.removeItem("dateFilter");

		const unixTimestamp = moment(date, "YYYY-MM-DD").unix();

		dispatch(nextMonth(unixTimestamp.toString()));
	};

	return (
		<div className={stl.wrapp}>
			<ControlBar
				date={today}
				prevHandler={prevHandler}
				todayHandler={todayHandler}
				nextHandler={nextHandler}
				changeDateHandler={changeDateHandler}
			/>
		</div>
	);
};

export default ControlBarConteiner;
