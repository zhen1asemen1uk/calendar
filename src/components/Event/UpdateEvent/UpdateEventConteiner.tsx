import moment from "moment";
import { FC, useState } from "react";

import { eventAPI } from "../../../API/eventAPI";
import UpdateEvent from "./UpdateEvent";
import { useAppDispatch } from "../../../hooks";
import { IEvent } from "../../../reducers/eventReducer/type";

const UpdateEventConteiner: FC<IEvent> = (props) => {
	const { _id, title, desc, date, time } = props;

	const dispatch = useAppDispatch();

	const [data, setData] = useState<IEvent>({
		_id,
		title,
		desc,
		date: moment.unix(+date).format("DD.MM.YYYY"),
		time: moment(time).format("HH:mm"),
	});

	const updateEvent = ({ _id, title, desc, date, time }: IEvent) => {
		dispatch(eventAPI.updateEvent(_id!, title, desc, date, time));
	};

	const deleteEvent = ({
		_id,
		date,
	}: {
		_id: IEvent["_id"];
		date: IEvent["date"];
	}) => dispatch(eventAPI.deleteEvent(_id!, date));

	return (
		<UpdateEvent
			updateEvent={updateEvent}
			deleteEvent={deleteEvent}
			data={data}
			setData={setData}
		/>
	);
};

export default UpdateEventConteiner;
