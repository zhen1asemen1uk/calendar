import moment from "moment";
import { FC, useState } from "react";

import { eventAPI } from "../../../API/eventAPI";
import AddEvent from "./AddEvent";
import { useAppDispatch } from "../../../hooks";
import { IEvent } from "../../../reducers/eventReducer/type";

interface IAddEventConteiner {
	dte?: string;
}

const AddEventConteiner: FC<IAddEventConteiner> = (props) => {
	const { dte } = props;

	const dispatch = useAppDispatch();

	const [data, setData] = useState<IEvent>({
		title: "",
		desc: "",
		date: dte
			? moment(dte).format(`YYYY-MM-DD`)
			: moment().format(`YYYY-MM-DD`),
		time: moment().format("HH:mm"),
	});

	const addEvent = ({ title, desc, date, time }: IEvent) => {
		dispatch(eventAPI.addEvent(title, desc, date, time));
	};

	return (
		<AddEvent
			addEvent={addEvent}
			data={data}
			setData={setData}
			// title={title}
			// setTitle={setTitle}
			// content={content}
			// setContent={setContent}
			// date={date}
			// setDate={setDate}
			// time={time}
			// setTime={setTime}
		/>
	);
};

export default AddEventConteiner;
