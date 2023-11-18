import { FC, ReactNode } from "react";
import { authAPI } from "../../../API/authAPI";
// import { eventAPI } from '../../../API/eventAPI';
import {
	isModal,
	modalChildren,
} from "../../../reducers/authReducer/authSlice";

import Loading from "../Loading/Loading";
import Login from "./Login";
import { useAppDispatch, useAppSelector } from "../../../hooks";

const LoginConteiner: FC = () => {
	const dispatch = useAppDispatch();

	const authState = useAppSelector((state) => state.authState);
	const isLoading = useAppSelector((store) => store.authState.isLoading);

	const isModalSet = (set: boolean, child: ReactNode | null) => {
		dispatch(isModal(set));
		if (child) dispatch(modalChildren(child));
	};

	const sendLoginData = (login: string, password: string) => {
		dispatch(authAPI.login(login, password));
		// dispatch(eventAPI.getAllEvents());
		// dispatch(eventAPI.getEventByUserIDAndTime(authState.user.id, gte, lte)); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	};

	return (
		<>
			{authState.isAuth ? (
				isLoading === true ? (
					<Loading />
				) : (
					<h3>
						Welcome{" "}
						{authState.user ? authState.user.login : "Here must be your login"}
					</h3>
				)
			) : isLoading === true ? (
				<Loading />
			) : (
				<Login
					authState={authState}
					sendLoginData={sendLoginData}
					isModalSet={isModalSet}
				/>
			)}
		</>
	);
};

export default LoginConteiner;
