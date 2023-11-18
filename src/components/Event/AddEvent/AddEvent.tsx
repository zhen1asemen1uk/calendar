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
			<div className={stl.addEvent}>
				<input
					type='text'
					placeholder='Title event'
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
					placeholder='DD.MM.YYYY'
					autoComplete='off'
					name='date'
					id={stl.date}
					value={moment(data.date).format(`YYYY-MM-DD`)}
					onChange={(e) =>
						setData({
							...data,
							date: moment(e.target.value).format(`DD.MM.YYYY`),
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
					value={data.time}
					onChange={(e) => setData({ ...data, time: e.target.value })}
					className={`${stl.eventInp} ${stl.date}`}
				/>

				<br />
				{/* date.match(/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/) && */}
				{data.desc.length > 0 && data.title.length > 0 ? (
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
