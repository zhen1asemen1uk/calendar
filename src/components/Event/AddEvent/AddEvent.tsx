import React, { FC } from "react";

import stl from "../Event.module.css";
import moment from "moment";
import { IEvent } from "../../../reducers/eventReducer/type";

interface IAddEvent {
	addEvent: (data: IEvent) => void;
	data: IEvent;
	setData: React.Dispatch<React.SetStateAction<IEvent>>;
}

const AddEvent: FC<IAddEvent> = (props) => {
	const { addEvent, data, setData } = props;

	return (
		<>
			<h3>Add new Event</h3>
			<div className={stl.addEvent}>
				<input
					type='text'
					placeholder='Title event'
					autoFocus
					autoComplete='off'
					name='title'
					id={stl.title}
					value={data.title}
					onChange={(e) => setData({ ...data, title: e.target.value })}
					className={`${stl.eventInp} ${stl.title}`}
				/>

				<br />

				<input
					type='text'
					placeholder='Description'
					autoComplete='off'
					name='content'
					id={stl.content}
					value={data.desc}
					onChange={(e) => setData({ ...data, desc: e.target.value })}
					className={`${stl.eventInp} ${stl.content}`}
				/>

				<br />

				<input
					type='date'
					placeholder={moment().format("yyyy-MM-dd")}
					autoComplete='off'
					name='date'
					id={stl.date}
					value={moment.unix(+data.date).format(`YYYY-MM-DD`)}
					onChange={(e) =>
						setData({
							...data,
							date: moment(e.target.value).unix().toString(),
						})
					}
					className={`${stl.eventInp} ${stl.date}`}
				/>

				<br />

				<input
					type='time'
					placeholder={moment().format("HH:mm")}
					autoComplete='off'
					name='date'
					id={stl.date}
					value={moment.unix(+data.date).format("HH:mm")}
					onChange={(e) => {
						const time = e.target.value.split(":");
						const hours = time[0];
						const minutes = time[1];

						setData({
							...data,
							date: moment
								.unix(+data.date)
								.add(hours, "hours")
								.add(minutes, "minutes")
								.unix()
								.toString(),
						});
					}}
					className={`${stl.eventInp} ${stl.date}`}
				/>

				<br />
				{/* date.match(/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/) && */}
				{data.title.length > 0 ? (
					<button
						className={stl.btn}
						onClick={() => {
							addEvent(data);
						}}>
						Add
					</button>
				) : (
					<div>Enter all fields</div>
				)}
			</div>
		</>
	);
};
export default AddEvent;
