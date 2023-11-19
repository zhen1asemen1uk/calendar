import moment from "moment";
import { FC, useState } from "react";

import { eventAPI } from "../../../API/eventAPI";
import AddEvent from "./AddEvent";
import { useAppDispatch } from "../../../hooks";
import { IEvent } from "../../../reducers/eventReducer/type";

interface IAddEventConteiner {
	date?: string;
	closeModal: () => void;
}

const AddEventConteiner: FC<IAddEventConteiner> = (props) => {
	const { date, closeModal } = props;

	const dispatch = useAppDispatch();

	const [data, setData] = useState<IEvent>({
		title: "",
		desc: "",
		date: date || moment().unix().toString(),
		created_at: moment().unix().toString(),
		updated_at: moment().unix().toString(),
	});

	const addEvent = ({ title, desc, date, created_at, updated_at }: IEvent) => {
		dispatch(eventAPI.addEvent(title, desc, date, created_at, updated_at));
		closeModal();
	};

	return <AddEvent addEvent={addEvent} data={data} setData={setData} />;
};

export default AddEventConteiner;
