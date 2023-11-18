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

	const prevHandler = () => {
		dispatch(prevMonth(today.clone().subtract(1, "month")));
	};

	const todayHandler = () => {
		dispatch(todayMonth(moment()));
	};

	const nextHandler = () => {
		dispatch(nextMonth(today.clone().add(1, "month")));
	};

	return (
		<div className={stl.wrapp}>
			<ControlBar
				date={today}
				prevHandler={prevHandler}
				todayHandler={todayHandler}
				nextHandler={nextHandler}
			/>
		</div>
	);
};

export default ControlBarConteiner;
