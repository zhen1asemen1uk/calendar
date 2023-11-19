import { FC, useCallback, useState } from "react";
import moment from "moment";

import AddEventConteiner from "../Event/AddEvent/AddEventConteiner";
import UpdateEventConteiner from "../Event/UpdateEvent/UpdateEventConteiner";

import stl from "./CalendarMonth.module.css";
import ControlBarConteiner from "./ControlBar/ControlBarConteiner";
import Modal from "../Modal/Modal";

import { IEvent } from "../../reducers/eventReducer/type";
import { Row } from "../styles";

// import WeekBar from "./WeekBar/WeekBar";

interface ICalendarMonth {
	today: string;
	isAuth: boolean;
	arrDays: moment.Moment[];
	eventDataForMonth: IEvent[];
}

const CalendarMonth: FC<ICalendarMonth> = (props) => {
	const { today, arrDays, eventDataForMonth } = props;

	// modals state
	const [modalObj, setModalObj] = useState<IEvent | null>(null);
	const [addEventModal, setAddEventModal] = useState<moment.Moment | null>(
		null
	);

	// generate class for day
	const classWeek = useCallback((numDay: moment.Moment) => {
		if (numDay.day() === 0 || numDay.day() === 6) {
			return `${stl.week}`;
		}
		return `${stl.day}`;
	}, []);

	// generate class for number day
	const classNum = useCallback(
		(numDay: moment.Moment, isWeekDay?: boolean) => {
			if (
				numDay.date() === moment.unix(+today).date() &&
				numDay.month() === moment.unix(+today).month() &&
				!isWeekDay
			) {
				return `${stl.numToday} ${stl.numDay}`;
			} else if (numDay.month() !== moment.unix(+today).month()) {
				return `${stl.numAnotherMonth}  ${stl.numDay}`;
			} else {
				return `${stl.numDay}`;
			}
		},
		[today]
	);

	// generate events for day
	const eventsOfDay = useCallback(
		({ startDay, endDay }: { startDay: string; endDay: string }) => {
			if (eventDataForMonth.length > 0) {
				const events = eventDataForMonth
					.filter((e) => +e.date >= +startDay && +e.date <= +endDay)
					.map((elem, i) => (
						<li key={`${endDay}${i}`} onClick={() => setModalObj(elem)}>
							{elem.title}
						</li>
					));

				return events;
			}
		},
		[eventDataForMonth]
	);

	// generate days for month
	const daysInMonth = useCallback(() => {
		return arrDays.map((numDay, i) => {
			const startDay = numDay.clone().startOf("day").format("X");
			const endDay = numDay.clone().endOf("day").format("X");

			return (
				<div
					key={`${i}`}
					className={classWeek(numDay)}
					onDoubleClick={() => {
						setAddEventModal(numDay);
					}}>
					<Row w='100%' jc='space-between'>
						<div className={classNum(numDay, true)}>{numDay.format("ddd")}</div>

						<div className={classNum(numDay)}>
							<div>{numDay.format("D")}</div>
						</div>
					</Row>

					<ul className={stl.events}>{eventsOfDay({ startDay, endDay })}</ul>
				</div>
			);
		});
	}, [arrDays, classNum, classWeek, eventsOfDay]);

	return (
		<>
			<ControlBarConteiner />
			{/* <WeekBar /> temporary off */}
			<div className={stl.wrapp}>{daysInMonth()}</div>
			{addEventModal && (
				<Modal
					handleClose={() => {
						setAddEventModal(null);
					}}
					show={!!addEventModal}>
					<AddEventConteiner
						date={addEventModal.unix().toString()}
						closeModal={() => setAddEventModal(null)}
					/>
				</Modal>
			)}
			{modalObj && (
				<Modal show={!!modalObj} handleClose={() => setModalObj(null)}>
					<UpdateEventConteiner
						_id={modalObj._id!}
						title={modalObj.title}
						desc={modalObj.desc}
						date={modalObj.date}
						created_at={modalObj.created_at}
						updated_at={modalObj.updated_at}
						closeModal={() => setModalObj(null)}
					/>
				</Modal>
			)}
		</>
	);
};

export default CalendarMonth;
