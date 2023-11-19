import { Dispatch, FC, SetStateAction, useMemo } from "react";
import stl from "../Event.module.css";
import { IEvent } from "../../../reducers/eventReducer/type";
import moment from "moment";
import styled from "styled-components";

const DateText = styled.span`
	font-size: 0.8rem;
	color: #a8a8a8;
	font-weight: 700;
	margin: 0 auto 10px auto;
`;

interface IUpdateEvent {
	data: IEvent;
	setData: Dispatch<SetStateAction<IEvent>>;
	updateEvent: (data: IEvent) => void;
	deleteEvent: ({ _id, date }: { _id: string; date: string }) => void;
}

const UpdateEvent: FC<IUpdateEvent> = (props) => {
	const { data, setData, updateEvent, deleteEvent } = props;

	const date = useMemo(() => {
		const showDate =
			+data.created_at !== +data.updated_at
				? `
Updated at:
${moment.unix(+data.updated_at).format(`DD.MM.YYYY HH:mm`)}`
				: `
Created at:
${moment.unix(+data.created_at).format(`DD.MM.YYYY HH:mm`)}`;

		return showDate;
	}, [data.created_at, data.updated_at]);

	return (
		<>
			<h3>Update event</h3>
			<DateText>{date}</DateText>
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
					placeholder='DD.MM.YYYY'
					autoComplete='off'
					name='date'
					id={stl.date}
					value={moment.unix(+data.date).format(`YYYY-MM-DD`)}
					onChange={(e) =>
						setData({ ...data, date: moment(e.target.value).unix().toString() })
					}
					className={`${stl.eventInp} ${stl.date}`}
				/>
				<br />

				<input
					type='time'
					placeholder='DD.MM.YYYY'
					autoComplete='off'
					name='date'
					id={stl.date}
					value={moment.unix(+data.date).format(`HH:mm`)}
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
				{/* const updateEvent = ({ _id, title, desc, date }: IEvent) => { */}
				{/* {date.match(/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/) && */}
				<div className={stl.btnWrapp}>
					{data.title.length > 0 ? (
						<button
							className={stl.btn}
							onClick={() => {
								updateEvent({
									_id: data._id,
									title: data.title,
									desc: data.desc,
									date: data.date,
									created_at: data.created_at,
									updated_at: moment().unix().toString(),
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
