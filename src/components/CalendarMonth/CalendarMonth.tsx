import { FC, ReactNode } from "react";
import moment from "moment";

import AddEventConteiner from "../Event/AddEvent/AddEventConteiner";
import UpdateEventConteiner from "../Event/UpdateEvent/UpdateEventConteiner";

import stl from "./CalendarMonth.module.css";
import ControlBarConteiner from "./ControlBar/ControlBarConteiner";
import WeekBar from "./WeekBar/WeekBar";
import { IEvent } from "../../reducers/eventReducer/type";

interface ICalendarMonth {
	today: moment.Moment;
	isAuth: boolean;
	arrDays: moment.Moment[];
	eventDataForMonth: IEvent[];
	isModalSet: (set: boolean, child: ReactNode | null) => void;
}

const CalendarMonth: FC<ICalendarMonth> = (props) => {
	const { today, isAuth, arrDays, eventDataForMonth, isModalSet } = props;

	return (
		<>
			<ControlBarConteiner />
			<WeekBar />
			<div className={stl.wrapp}>
				{arrDays.map((numDay, i) => {
					const startDay = numDay.clone().startOf("day").format("X");
					const endDay = numDay.clone().endOf("day").format("X");

					const classWeek = () => {
						if (numDay.day() === 0 || numDay.day() === 6) {
							return `${stl.week}`;
						}
						return `${stl.day}`;
					};

					const classNum = () => {
						if (
							numDay.date() === today.date() &&
							numDay.month() === today.month()
						) {
							return `${stl.numToday} ${stl.numDay}`;
						} else if (numDay.month() !== today.month()) {
							return `${stl.numAnotherMonth}  ${stl.numDay}`;
						} else {
							return `${stl.numDay}`;
						}
					};
					const eventsOfDay = () => {
						if (eventDataForMonth && typeof eventDataForMonth == "object") {
							return eventDataForMonth
								.filter((e) => e.date >= startDay && e.date <= endDay)
								.map((elem, i) => (
									<li
										key={elem.date + i}
										onClick={() => {
											isModalSet(
												true,
												<UpdateEventConteiner
													_id={elem._id!}
													title={elem.title}
													desc={elem.desc}
													date={elem.date}
													time={elem.time}
												/>
											);
										}}>
										{" "}
										{elem.title}
									</li>
								));
						}
					};

					return (
						<div
							key={numDay.format(`DDMMYYYY${i}`)}
							className={classWeek()}
							onDoubleClick={() => {
								isAuth
									? isModalSet(
											true,
											<AddEventConteiner dte={numDay.format(`DD.MM.YYYY`)} />
									  )
									: alert(`Register pls`);
							}}>
							<div className={classNum()}>
								<div>{numDay.format("D")}</div>
							</div>

							<ul className={stl.events}>{eventsOfDay()}</ul>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default CalendarMonth;
