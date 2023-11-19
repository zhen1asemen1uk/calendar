import { FC } from "react";
import { authAPI } from "../../../API/authAPI";
// import { eventAPI } from '../../../API/eventAPI';

import Loading from "../Loading/Loading";
import Login from "./Login";
import { useAppDispatch, useAppSelector } from "../../../hooks";

const LoginConteiner: FC = () => {
	const dispatch = useAppDispatch();

	const authState = useAppSelector((state) => state.authState);
	const isLoading = useAppSelector((store) => store.authState.isLoading);

	const sendLoginData = (login: string, password: string) => {
		dispatch(authAPI.login(login, password));
		// dispatch(eventAPI.getAllEvents());
		// dispatch(eventAPI.getEventByUserIDAndTime(authState.user.id, gte, lte)); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	};

	if (isLoading) <Loading />;

	return (
		<>
			{authState.isAuth ? (
				<h3>
					Welcome{" "}
					{authState.user ? authState.user.login : "Here must be your login"}
				</h3>
			) : (
				<Login authState={authState} sendLoginData={sendLoginData} />
			)}
		</>
	);
};

export default LoginConteiner;
