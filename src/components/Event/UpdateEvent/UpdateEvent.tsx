import { Dispatch, FC, SetStateAction } from "react";
import stl from "../Event.module.css";
import { IEvent } from "../../../reducers/eventReducer/type";

interface IUpdateEvent {
	data: IEvent;
	setData: Dispatch<SetStateAction<IEvent>>;
	updateEvent: (data: IEvent) => void;
	deleteEvent: ({ _id, date }: { _id: string; date: string }) => void;
}

const UpdateEvent: FC<IUpdateEvent> = (props) => {
	const { data, setData, updateEvent, deleteEvent } = props;

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
					type='text'
					placeholder='DD.MM.YYYY'
					autoComplete='off'
					name='date'
					id={stl.date}
					value={data.date}
					onChange={(e) => setData({ ...data, date: e.target.value })}
					className={`${stl.eventInp} ${stl.date}`}
				/>

				<br />
				{/* const updateEvent = ({ _id, title, desc, date, time }: IEvent) => { */}
				{/* {date.match(/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/) && */}
				<div className={stl.btnWrapp}>
					{data.desc.length > 0 && data.title.length > 0 ? (
						<button
							className={stl.btn}
							onClick={() => {
								updateEvent({
									_id: data._id,
									title: data.title,
									desc: data.desc,
									date: data.date,
									time: data.time,
								});
							}}>
							Update
						</button>
					) : (
						<div>Enter all fields</div>
					)}

					<button
						className={`${stl.btn} ${stl.btnDelete}`}
						onClick={() => deleteEvent({ _id: data._id!, date: data.date })}>
						Delete
					</button>
				</div>
			</div>
		</>
	);
};

export default UpdateEvent;
