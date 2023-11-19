import { FC, useState } from "react";

import { eventAPI } from "../../../API/eventAPI";
import UpdateEvent from "./UpdateEvent";
import { useAppDispatch } from "../../../hooks";
import { IEvent } from "../../../reducers/eventReducer/type";

const UpdateEventConteiner: FC<IEvent & { closeModal: () => void }> = (
	props
) => {
	const { _id, title, desc, date, created_at, updated_at, closeModal } = props;

	const dispatch = useAppDispatch();

	const [data, setData] = useState<IEvent>({
		_id,
		title,
		desc,
		date,
		created_at,
		updated_at,
	});

	const updateEvent = ({
		_id,
		title,
		desc,
		date,
		created_at,
		updated_at,
	}: IEvent) => {
		dispatch(
			eventAPI.updateEvent(_id!, title, desc, date, created_at, updated_at)
		);
		closeModal();
	};

	const deleteEvent = ({ _id }: { _id: IEvent["_id"] }) => {
		dispatch(eventAPI.deleteEvent(_id!));
		closeModal();
	};

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
